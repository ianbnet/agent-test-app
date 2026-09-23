import { useEffect, useState } from "react";

/** Phones and portrait tablets get the touch layout (bottom sheet + depth rail). */
const QUERY = "(max-width: 1023px), (max-height: 540px)";

export function useCompactLayout() {
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const on = () => setCompact(mq.matches);
    mq.addEventListener("change", on);
    on();
    return () => mq.removeEventListener("change", on);
  }, []);
  return compact;
}
