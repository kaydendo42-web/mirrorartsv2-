"use client";

import { useEffect, useState } from "react";

/* Starts false so the server and the first client render agree, then corrects
   on mount. Anything gated on this must therefore degrade safely for one
   frame — in practice that means using it to stop motion, never to decide
   what content exists. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    // Subscribing to a browser-level preference is exactly the external-system
    // case effects are for; the initial read has to happen here because
    // matchMedia does not exist during render or on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
