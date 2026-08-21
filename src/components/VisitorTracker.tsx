"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function VisitorTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    
    const trackVisit = async () => {
      // Use sessionStorage to prevent multiple increments in same session/tab
      const hasVisited = sessionStorage.getItem("hasVisitedSession");
      if (!hasVisited) {
        try {
          const supabase = createClient();
          await supabase.rpc('increment_page_view');
          sessionStorage.setItem("hasVisitedSession", "true");
        } catch (error) {
          console.error("Failed to track visitor:", error);
        }
      }
    };

    trackVisit();
    tracked.current = true;
  }, []);

  return null;
}
