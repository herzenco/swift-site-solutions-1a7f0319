import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasLogged = useRef(false);

  useEffect(() => {
    // Prevent redirect loops - if somehow we're at root, don't process
    if (location.pathname === "/") {
      return;
    }

    // Only log once per mount to avoid duplicate logs
    if (!hasLogged.current) {
      hasLogged.current = true;

      // Capture 404 event details
      const notFoundEvent = {
        type: "404_error",
        requestedUrl: location.pathname + location.search + location.hash,
        referrer: document.referrer || "direct",
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };

      // Log to console for debugging
      console.error("404 Error:", notFoundEvent);

      // Log to analytics if available (can be extended to send to backend)
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "page_not_found", {
          page_path: notFoundEvent.requestedUrl,
          referrer: notFoundEvent.referrer,
        });
      }

      // Store in sessionStorage for potential backend reporting
      try {
        const existing = JSON.parse(sessionStorage.getItem("404_logs") || "[]");
        existing.push(notFoundEvent);
        sessionStorage.setItem("404_logs", JSON.stringify(existing.slice(-10))); // Keep last 10
      } catch (e) {
        // Ignore storage errors
      }
    }

    // Redirect to home after logging
    navigate("/", { replace: true });
  }, [location, navigate]);

  // Brief loading state while redirecting (users shouldn't see this)
  return null;
};

export default NotFound;
