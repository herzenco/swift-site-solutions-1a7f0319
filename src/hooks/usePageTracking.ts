import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("page_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("page_session_id", sessionId);
  }
  return sessionId;
};

// Detect device type
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

export const usePageTracking = () => {
  const location = useLocation();
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const currentPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    // Don't track dashboard or auth pages
    if (location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/auth")) {
      return;
    }

    const sessionId = getSessionId();
    const startTime = Date.now();
    
    // Track page view
    const trackPageView = async () => {
      try {
        const { error } = await supabase.from("page_sessions").insert({
          session_id: sessionId,
          page_path: location.pathname,
          referrer: document.referrer || null,
          device_type: getDeviceType(),
          started_at: new Date().toISOString(),
        });
        
        if (error) {
          console.error("Error tracking page view:", error);
        }
      } catch (err) {
        console.error("Page tracking error:", err);
      }
    };

    trackPageView();
    sessionIdRef.current = sessionId;
    startTimeRef.current = startTime;
    currentPathRef.current = location.pathname;

    // Update duration on page unload or navigation
    const updateDuration = async () => {
      if (!sessionIdRef.current) return;
      
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      
      try {
        await supabase
          .from("page_sessions")
          .update({
            ended_at: new Date().toISOString(),
            duration_seconds: duration,
          })
          .eq("session_id", sessionIdRef.current)
          .eq("page_path", currentPathRef.current)
          .is("ended_at", null);
      } catch (err) {
        console.error("Duration update error:", err);
      }
    };

    // Handle visibility change (tab switch, minimize)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateDuration();
      }
    };

    // Handle before unload
    const handleBeforeUnload = () => {
      updateDuration();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      updateDuration();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname]);
};
