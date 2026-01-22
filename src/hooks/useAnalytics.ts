import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

// Get or create session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("page_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("page_session_id", sessionId);
  }
  return sessionId;
};

// Parse UTM parameters from URL
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };
};

// Get browser info
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let os = "Unknown";

  // Browser detection
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("SamsungBrowser")) browser = "Samsung";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  else if (ua.includes("Trident")) browser = "IE";
  else if (ua.includes("Edge")) browser = "Edge";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";

  // OS detection
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return { browser, os };
};

// Get device type
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

// Track analytics event
export const trackEvent = async (
  eventType: string,
  eventName: string,
  metadata: Record<string, unknown> = {}
) => {
  try {
    const sessionId = getSessionId();
    await supabase.from("analytics_events").insert({
      session_id: sessionId,
      event_type: eventType,
      event_name: eventName,
      element_id: (metadata.elementId as string) || null,
      element_text: (metadata.elementText as string) || null,
      page_path: window.location.pathname,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      },
    });
  } catch (error) {
    console.error("Analytics tracking error:", error);
  }
};

// Hook for comprehensive page and interaction tracking
export const useAnalytics = () => {
  const location = useLocation();
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const scrollMilestonesRef = useRef<Set<number>>(new Set());

  // Track button/link clicks
  const trackClick = useCallback((
    elementName: string,
    elementId?: string,
    additionalData?: Record<string, unknown>
  ) => {
    trackEvent("click", elementName, {
      elementId,
      ...additionalData,
    });
  }, []);

  // Track form interactions
  const trackFormStart = useCallback((formName: string) => {
    trackEvent("form", `${formName}_start`, { formName });
  }, []);

  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    trackEvent("form", `${formName}_submit`, { formName, success });
  }, []);

  const trackFormError = useCallback((formName: string, errorMessage: string) => {
    trackEvent("form", `${formName}_error`, { formName, errorMessage });
  }, []);

  // Track modal opens
  const trackModalOpen = useCallback((modalName: string) => {
    trackEvent("modal", `${modalName}_open`, { modalName });
  }, []);

  const trackModalClose = useCallback((modalName: string) => {
    trackEvent("modal", `${modalName}_close`, { modalName });
  }, []);

  // Track CTA clicks
  const trackCTA = useCallback((ctaName: string, ctaLocation: string) => {
    trackEvent("cta", ctaName, { ctaLocation });
  }, []);

  // Track external link clicks
  const trackExternalLink = useCallback((url: string, linkText: string) => {
    trackEvent("external_link", "external_link_click", { url, elementText: linkText });
  }, []);

  // Track video interactions
  const trackVideo = useCallback((action: "play" | "pause" | "complete", videoId: string) => {
    trackEvent("video", `video_${action}`, { videoId });
  }, []);

  useEffect(() => {
    // Skip tracking for dashboard/auth pages
    if (location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/auth")) {
      return;
    }

    const sessionId = getSessionId();
    sessionIdRef.current = sessionId;
    startTimeRef.current = Date.now();
    maxScrollRef.current = 0;
    scrollMilestonesRef.current = new Set();

    // Get all tracking data
    const utmParams = getUTMParams();
    const { browser, os } = getBrowserInfo();
    const deviceType = getDeviceType();

    // Track enhanced page view
    const trackPageView = async () => {
      try {
        await supabase.from("page_sessions").insert({
          session_id: sessionId,
          page_path: location.pathname,
          referrer: document.referrer || null,
          device_type: deviceType,
          started_at: new Date().toISOString(),
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_term: utmParams.utm_term,
          utm_content: utmParams.utm_content,
          browser,
          os,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          viewport_width: window.innerWidth,
          viewport_height: window.innerHeight,
        });
      } catch (err) {
        console.error("Page tracking error:", err);
      }
    };

    trackPageView();

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
      }

      // Track scroll milestones (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          trackEvent("scroll", `scroll_${milestone}`, { scrollDepth: milestone });
        }
      }
    };

    // Debounced scroll handler
    let scrollTimeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    // Track all clicks on interactive elements
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("button");
      const link = target.closest("a");
      const clickable = target.closest("[data-track]");

      if (button) {
        const text = button.textContent?.trim().slice(0, 50) || "";
        const id = button.id || button.getAttribute("data-track") || "";
        trackEvent("click", "button_click", { elementId: id, elementText: text });
      } else if (link) {
        const href = link.getAttribute("href") || "";
        const text = link.textContent?.trim().slice(0, 50) || "";
        const isExternal = href.startsWith("http") && !href.includes(window.location.host);
        
        if (isExternal) {
          trackEvent("click", "external_link_click", { elementText: text, url: href });
        } else {
          trackEvent("click", "link_click", { elementText: text, url: href });
        }
      } else if (clickable) {
        const trackName = clickable.getAttribute("data-track") || "";
        trackEvent("click", trackName, { elementId: clickable.id });
      }
    };

    // Update session on leave
    const updateSession = async () => {
      if (!sessionIdRef.current) return;
      
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      
      try {
        await supabase
          .from("page_sessions")
          .update({
            ended_at: new Date().toISOString(),
            duration_seconds: duration,
            max_scroll_depth: maxScrollRef.current,
          })
          .eq("session_id", sessionIdRef.current)
          .eq("page_path", location.pathname)
          .is("ended_at", null);
      } catch (err) {
        console.error("Session update error:", err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) updateSession();
    };

    const handleBeforeUnload = () => updateSession();

    // Add event listeners
    window.addEventListener("scroll", debouncedScroll, { passive: true });
    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      updateSession();
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", debouncedScroll);
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname]);

  return {
    trackClick,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackModalOpen,
    trackModalClose,
    trackCTA,
    trackExternalLink,
    trackVideo,
    trackEvent,
  };
};

export default useAnalytics;
