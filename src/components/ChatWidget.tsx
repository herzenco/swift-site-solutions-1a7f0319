import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { supabase, SUPABASE_FUNCTIONS_URL } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { sendLeadToZapier } from "@/lib/zapier";
import ReactMarkdown from "react-markdown";
import { XyrenIcon } from "./XyrenIcon";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type ChatStep = 
  | "greeting" 
  | "ask_url" 
  | "get_url" 
  | "analyzing" 
  | "contact" 
  | "complete";

interface CollectedData {
  name: string;
  hasUrl: boolean;
  url: string;
  websiteFeedback: string;
  email: string;
  phone: string;
  industry: string;
}


const generateSessionId = () => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const ChatWidget = () => {
  const sessionId = useMemo(() => generateSessionId(), []);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("greeting");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey there! 👋 I can answer some quick questions, but if you'd prefer a real conversation, [reach out on WhatsApp](https://wa.me/17865893484) anytime.\n\nWhat's your name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [collectedData, setCollectedData] = useState<CollectedData>({
    name: "",
    hasUrl: false,
    url: "",
    websiteFeedback: "",
    email: "",
    phone: "",
    industry: "",
  });
  
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
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
    },
    currentMessages?: Message[]
  ) => {
    try {
      await supabase.from("chat_interactions").insert({
        session_id: sessionId,
        interaction_type: type,
        user_message: data.userMessage || null,
        assistant_message: data.assistantMessage || null,
        url_scraped: data.urlScraped || null,
        lead_id: data.leadId || null,
        metadata: {
          ...data.metadata,
          conversation_history: currentMessages || [],
          step: step,
          collected_data: collectedData,
        },
      } as any);
    } catch (error) {
      console.error("Error logging interaction:", error);
    }
  };

  const addAssistantMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "assistant", content }]);
  };

  const scrapeAndAnalyze = async (url: string) => {
    setIsLoading(true);
    addAssistantMessage("Analyzing your website... give me just a moment! 🔍");
    
    try {
      // Call firecrawl to scrape
      const { data: scrapeData, error: scrapeError } = await supabase.functions.invoke("firecrawl-scrape", {
        body: { url },
      });

      if (scrapeError || !scrapeData?.success) {
        throw new Error("Failed to analyze website");
      }

      const websiteContent = scrapeData.data?.markdown || scrapeData.markdown || "";
      
      // Log the URL scrape
      await logInteraction("url_scraped", { urlScraped: url });
      
      // Now get AI analysis
      const CHAT_URL = `${SUPABASE_FUNCTIONS_URL}/chat`;
      const analysisPrompt = `Based on this website content, provide exactly 3 quick, actionable fixes to improve conversions. Be specific and helpful. Keep each point to 1-2 sentences max.

Website content:
${websiteContent.slice(0, 3000)}

Format your response as:
1. [First fix]
2. [Second fix]  
3. [Third fix]`;

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YXdnbGxhd3RqdGR0cWpuaGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTc2NTIsImV4cCI6MjA4NDQ5MzY1Mn0.qbYRqeZvdT3K7K5rMg-U7vrNeiMrZA1uaiJPIByjmhw`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: analysisPrompt }],
          skipLeadCapture: true,
          skipUrlExtraction: true,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Analysis failed");
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let feedback = "";

      // Remove the "Analyzing" message and add streaming response
      setMessages((prev) => prev.slice(0, -1));
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
              feedback += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: feedback };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setCollectedData((prev) => ({ ...prev, websiteFeedback: feedback }));
      
      // After showing feedback, move to contact step
      setTimeout(() => {
        addAssistantMessage(`Great news, ${collectedData.name}! I can put together a more detailed analysis and recommendations for you. What's the best email or phone number to reach you?`);
        setStep("contact");
      }, 1500);

    } catch (error) {
      console.error("Analysis error:", error);
      setMessages((prev) => prev.slice(0, -1));
      addAssistantMessage("I had trouble analyzing that URL — some sites block automated access. Would you like to try a different website, or share your contact info so we can help you directly?");
      setStep("contact");
    } finally {
      setIsLoading(false);
    }
  };

  const saveLead = async () => {
    try {
      const { data: leadData, error: insertError } = await supabase.from("leads").insert({
        full_name: collectedData.name,
        email: collectedData.email || null,
        phone: collectedData.phone || null,
        website: collectedData.url || null,
        source: "chatbot",
        notes: collectedData.websiteFeedback || "Lead from scripted chat flow",
        industry: collectedData.industry || null,
        lead_score: collectedData.url ? 35 : 20,
        qualification_status: collectedData.url ? "warm" : "cool",
      }).select().maybeSingle();

      if (insertError) {
        console.error("Error inserting lead:", insertError);
        return;
      }

      console.log("Lead saved:", leadData);

      // Send to Zapier
      if (leadData) {
        sendLeadToZapier({
          id: leadData.id,
          full_name: leadData.full_name,
          email: leadData.email,
          phone: leadData.phone,
          website: leadData.website,
          source: leadData.source,
          notes: leadData.notes,
          industry: leadData.industry,
        });
      }

      await logInteraction("lead_captured", {
        leadId: leadData?.id,
        metadata: { 
          name: collectedData.name, 
          email: collectedData.email,
          phone: collectedData.phone,
          url: collectedData.url,
          industry: collectedData.industry,
          hasWebsiteFeedback: !!collectedData.websiteFeedback,
        },
      }, messages);
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  // Helper to validate if input looks like a domain/URL
  const isLikelyDomain = (text: string): boolean => {
    const cleaned = text.trim().toLowerCase();
    // Must contain a dot, no spaces, and end with a valid TLD pattern
    if (cleaned.includes(" ") || !cleaned.includes(".")) return false;
    // Check for common TLDs
    const tldPattern = /\.(com|net|org|io|co|dev|app|me|ai|xyz|info|biz|us|uk|ca|au|de|fr|es|it|nl|se|no|dk|fi|ch|at|be|pl|ru|jp|cn|in|br|mx|ar|cl|za|nz|sg|hk|kr|tw|my|ph|th|vn|id|tr|ae|sa|eg|il|ie|pt|cz|ro|hu|gr|bg|hr|sk|si|ee|lv|lt|ua|by|kz|uz|pk|bd|lk|np|mm|la|kh|mn)(?:\/|$)/i;
    return tldPattern.test(cleaned);
  };

  // Helper to normalize URL (prepend https:// if needed)
  const normalizeUrl = (text: string): string => {
    let url = text.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    return url;
  };

  const handleUserInput = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    
    // Bug 2 fix: Enforce max input length
    const MAX_INPUT_LENGTH = 500;
    if (userInput.length > MAX_INPUT_LENGTH) {
      addAssistantMessage("That message is a bit too long. Could you keep it shorter?");
      setInput("");
      return;
    }
    
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setInput("");

    // Log interaction without blocking the flow
    // Log interaction with full conversation history
    const updatedMessages = [...messages, { role: "user" as const, content: userInput }];
    logInteraction("message", { userMessage: userInput }, updatedMessages).catch(console.error);

    switch (step) {
      case "greeting":
        // User just provided their name
        setCollectedData((prev) => ({ ...prev, name: userInput }));
        addAssistantMessage(`Nice to meet you, ${userInput}! Do you have a website you'd like me to analyze? I can give you 3 quick fixes to improve it. (yes/no)`);
        setStep("ask_url");
        break;

      case "ask_url":
        const lowerInput = userInput.toLowerCase();
        
        // Check if user provided something that looks like a domain/URL
        if (isLikelyDomain(userInput) && !lowerInput.includes("no") && !lowerInput.includes("don't")) {
          const extractedUrl = normalizeUrl(userInput);
          setCollectedData((prev) => ({ ...prev, hasUrl: true, url: extractedUrl }));
          await scrapeAndAnalyze(extractedUrl);
          return;
        }
        
        // User answered yes/no to having a URL
        const hasUrl = lowerInput.includes("yes") || 
                       lowerInput.includes("yeah") || 
                       lowerInput.includes("yep") ||
                       lowerInput.includes("sure");
        
        setCollectedData((prev) => ({ ...prev, hasUrl }));
        
        if (hasUrl) {
          addAssistantMessage("Drop the URL and I'll check it out!");
          setStep("get_url");
        } else {
          addAssistantMessage(`No worries! Drop your email or phone and I'll send you some tips to get started.`);
          setStep("contact");
        }
        break;

      case "get_url":
        // Bug 1 fix: Accept domains without scheme and normalize
        if (!isLikelyDomain(userInput) && !userInput.startsWith("http")) {
          addAssistantMessage("That doesn't look like a valid website. Try something like example.com or https://example.com");
          return;
        }
        const url = normalizeUrl(userInput);
        setCollectedData((prev) => ({ ...prev, url }));
        await scrapeAndAnalyze(url);
        break;

      case "contact":
        // Check if user is providing a URL to analyze instead of contact info
        if (isLikelyDomain(userInput) && !userInput.includes('@')) {
          const newUrl = normalizeUrl(userInput);
          setCollectedData((prev) => ({ ...prev, url: newUrl }));
          addAssistantMessage(`Sure thing! Let me analyze ${newUrl} for you.`);
          await scrapeAndAnalyze(newUrl);
          return;
        }
        
        // User provided contact info
        const emailMatch = userInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        const phoneMatch = userInput.match(/[\d\s\-\(\)\.+]{7,}/);
        
        if (emailMatch) {
          setCollectedData((prev) => ({ ...prev, email: emailMatch[0] }));
        }
        if (phoneMatch) {
          setCollectedData((prev) => ({ ...prev, phone: phoneMatch[0].trim() }));
        }
        
        // Bug 2 fix: Better error message with examples
        if (!emailMatch && !phoneMatch) {
          addAssistantMessage("That doesn't look like an email or phone number. Please enter an email like name@domain.com or a phone like 305-555-1234.");
          return;
        }
        
        // Save the lead directly (industry will be determined on dashboard)
        const finalData = { 
          ...collectedData, 
          email: emailMatch ? emailMatch[0] : collectedData.email,
          phone: phoneMatch ? phoneMatch[0].trim() : collectedData.phone,
        };
        
        try {
          const { data: leadData, error: insertError } = await supabase.from("leads").insert({
            full_name: finalData.name,
            email: finalData.email || null,
            phone: finalData.phone || null,
            website: finalData.url || null,
            source: "chatbot",
            notes: finalData.websiteFeedback || "Lead from scripted chat flow",
            industry: null,
            lead_score: finalData.url ? 35 : 20,
            qualification_status: finalData.url ? "warm" : "cool",
          }).select().maybeSingle();

          if (insertError) {
            console.error("Error inserting lead:", insertError);
          } else {
            console.log("Lead saved successfully:", leadData);

            // Send to Zapier
            if (leadData) {
              sendLeadToZapier({
                id: leadData.id,
                full_name: leadData.full_name,
                email: leadData.email,
                phone: leadData.phone,
                website: leadData.website,
                source: leadData.source,
                notes: leadData.notes,
              });
            }

            await logInteraction("lead_captured", {
              leadId: leadData?.id,
              metadata: { 
                name: finalData.name, 
                email: finalData.email,
                phone: finalData.phone,
                url: finalData.url,
                hasWebsiteFeedback: !!finalData.websiteFeedback,
              },
            }, messages);

            // Trigger lead enrichment if we have a URL
            if (leadData?.id && finalData.url) {
              console.log("Triggering lead enrichment for:", leadData.id);
              supabase.functions.invoke("enrich-lead", {
                body: { leadId: leadData.id, url: finalData.url }
              }).then(result => {
                console.log("Lead enrichment result:", result);
              }).catch(err => {
                console.error("Lead enrichment error:", err);
              });
            }
          }
        } catch (error) {
          console.error("Error saving lead:", error);
        }
        
        const closingMessage = finalData.url 
          ? `Thanks ${finalData.name}! You'll receive a more in-depth analysis of your site along with specific recommendations on how we can help within 24-48 hours. Talk soon! 🚀`
          : `Thanks ${finalData.name}! We'll reach out within 24-48 hours with more information on how we can help. Talk soon! 🚀`;
        
        addAssistantMessage(closingMessage);
        setStep("complete");
        break;


      case "complete":
        addAssistantMessage("Thanks for chatting! We'll be in touch soon. Feel free to explore our website in the meantime.");
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserInput();
    }
  };

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
            onClick={() => {
              triggerHaptic(15);
              setIsOpen(true);
            }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-primary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_hsl(190_100%_50%/0.4)] transition-all duration-300 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(190 100% 50%) 0%, hsl(260 80% 65%) 100%)" }}
            aria-label="Open chat"
          >
            <XyrenIcon size={26} />
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
            className="fixed z-50 bg-card shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden
              inset-0 w-full h-[100dvh]
              sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:max-w-[calc(100vw-48px)] sm:h-[540px] sm:max-h-[calc(100vh-100px)] sm:border sm:border-border sm:rounded-2xl"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-border bg-card pt-[env(safe-area-inset-top,0px)]">
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
                onClick={() => {
                  triggerHaptic(10);
                  setIsOpen(false);
                }}
                className="h-8 w-8 rounded-lg hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea 
              className="flex-1 min-h-0 px-5 py-5" 
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
              viewportRef={scrollViewportRef}
            >
              <div className="space-y-5 pb-2">
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
                      role="article"
                      aria-label={`${message.role === "user" ? "You" : "Xyren"} said`}
                    >
                      {message.content ? (
                        message.role === "assistant" ? (
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              a: ({ href, children }) => {
                                const isWhatsApp = href?.includes("wa.me");
                                return (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`font-medium underline underline-offset-2 transition-colors ${
                                      isWhatsApp 
                                        ? "text-[#25D366] hover:text-[#20BD5A]" 
                                        : "text-primary hover:text-primary/80"
                                    }`}
                                  >
                                    {children}
                                  </a>
                                );
                              },
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
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 border-t border-border bg-card pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              <div className="flex items-end gap-2">
                <div className={`flex-1 bg-muted rounded-xl px-4 py-2 transition-all ${isLoading ? 'ring-2 ring-primary/50 animate-pulse' : 'focus-within:ring-1 focus-within:ring-foreground/20'}`}>
                  <label htmlFor="chat-input" className="sr-only">Type your message</label>
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                  <textarea
                    id="chat-input"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={step === "complete" ? "Chat complete" : "Type your response..."}
                    disabled={isLoading || step === "analyzing"}
                    rows={1}
                    aria-describedby="chat-input-hint"
                    className="w-full bg-transparent border-0 resize-none text-sm placeholder:text-muted-foreground focus:outline-none py-1 max-h-20 disabled:opacity-50"
                  />
                  <span id="chat-input-hint" className="sr-only">Press Enter to send</span>
                </div>
                <Button
                  onClick={handleUserInput}
                  disabled={!input.trim() || isLoading || step === "analyzing"}
                  size="icon"
                  className="h-10 w-10 rounded-xl shrink-0 bg-foreground hover:bg-foreground/90 text-background disabled:opacity-30"
                  aria-label={isLoading ? "Sending message" : "Send message"}
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
