import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

// Generate a unique session ID for this chat session
const generateSessionId = () => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const ChatWidget = () => {
  const location = useLocation();
  const sessionId = useMemo(() => generateSessionId(), []);
  
  // Hide chat widget on dashboard and auth pages
  const hiddenPaths = ["/dashboard", "/auth"];
  const shouldHide = hiddenPaths.some((path) => location.pathname.startsWith(path));

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! Drop your website URL and I'll give you 3 quick tips to improve it. Or ask me anything about our services.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const logInteraction = async (
    type: "message" | "url_scraped" | "lead_captured",
    data: {
      userMessage?: string;
      assistantMessage?: string;
      urlScraped?: string;
      leadId?: string;
      metadata?: any;
    }
  ) => {
    try {
      await supabase.from("chat_interactions").insert({
        session_id: sessionId,
        interaction_type: type,
        user_message: data.userMessage || null,
        assistant_message: data.assistantMessage || null,
        url_scraped: data.urlScraped || null,
        lead_id: data.leadId || null,
        metadata: data.metadata || null,
      } as any);
    } catch (error) {
      console.error("Error logging interaction:", error);
    }
  };

  const extractAndSaveLead = async (content: string) => {
    // Regex that handles multi-line audit content using [\s\S] instead of [^"]
    const leadMatch = content.match(/\[LEAD_CAPTURED:\s*name="([^"]*)",\s*email="([^"]*)",\s*website="([^"]*)"(?:,\s*audit="([\s\S]*?)")?\]/);
    if (leadMatch) {
      const [fullMatch, name, email, website, audit] = leadMatch;
      try {
        const { data: leadData } = await supabase.from("leads").insert({
          full_name: name,
          email: email,
          website: website || null,
          source: "chatbot",
          notes: audit ? `Website audit: ${audit}` : "Lead captured via AI chatbot conversation",
        }).select().single();
        
        console.log("Lead saved:", { name, email, website, audit });
        
        // Log the lead capture interaction
        await logInteraction("lead_captured", {
          leadId: leadData?.id,
          metadata: { name, email, website, audit },
        });
      } catch (error) {
        console.error("Error saving lead:", error);
      }
      // Remove the entire marker from displayed content
      return content.replace(fullMatch, "").trim();
    }
    return content;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Log the message interaction
      await logInteraction("message", {
        userMessage: userMessage.content,
        assistantMessage: assistantContent,
      });

      // Check if a URL was likely scraped (simple heuristic)
      const urlRegex = /(https?:\/\/[^\s]+)|([a-zA-Z0-9][-a-zA-Z0-9]*\.(com|net|org|io|co|me|ai)[^\s]*)/gi;
      const urlMatch = userMessage.content.match(urlRegex);
      if (urlMatch && assistantContent.includes("quick wins")) {
        await logInteraction("url_scraped", {
          urlScraped: urlMatch[0],
          userMessage: userMessage.content,
        });
      }

      const cleanedContent = await extractAndSaveLead(assistantContent);
      if (cleanedContent !== assistantContent) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: cleanedContent };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
      });
      setMessages((prev) => prev.filter((m) => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Don't render on hidden paths
  if (shouldHide) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl text-primary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_hsl(190_100%_50%/0.4)] transition-all duration-300 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(190 100% 50%) 0%, hsl(260 80% 65%) 100%)" }}
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[540px] max-h-[calc(100vh-100px)] bg-card border border-border rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Xyren</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-5 py-5" ref={scrollRef}>
              <div className="space-y-5">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-foreground text-background px-4 py-3 rounded-2xl rounded-br-sm"
                          : "bg-muted px-4 py-3 rounded-2xl rounded-bl-sm text-foreground"
                      }`}
                    >
                      {message.content ? (
                        message.role === "assistant" ? (
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          message.content
                        )
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                          </span>
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-muted rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-foreground/20 transition-all">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message..."
                    disabled={isLoading}
                    rows={1}
                    className="w-full bg-transparent border-0 resize-none text-sm placeholder:text-muted-foreground focus:outline-none py-1 max-h-20"
                  />
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-10 w-10 rounded-xl shrink-0 bg-foreground hover:bg-foreground/90 text-background disabled:opacity-30"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
