"use client";

import { usePathname } from "next/navigation";
import { Children, cloneElement, isValidElement, useEffect, useRef, type ReactNode } from "react";

/** Word masks preserve the original text, emphasis, and explicit line breaks. */
export default function KineticText({ children, wash = false, page = false }: { children: ReactNode; wash?: boolean; page?: boolean }) {
  const root = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (wash || preference.matches) return;
    const animations = Array.from(root.current?.querySelectorAll(".studio-word > span") ?? []).map((word, i) =>
      word.animate([{ transform: page ? "translateY(108%) rotate(3deg)" : "translateY(105%)" }, { transform: "translateY(0) rotate(0deg)" }], {
        duration: page ? 780 : 1100, delay: page ? 100 + Math.min(i * 24, 240) : 650 + i * 32, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards",
      }),
    );
    const cancel = () => animations.forEach(a => a.cancel());
    preference.addEventListener("change", cancel);
    return () => { cancel(); preference.removeEventListener("change", cancel); };
  }, [wash, page, pathname]);

  function words(node: ReactNode): ReactNode {
    return Children.map(node, (child) => {
      if (typeof child === "string") return child.split(/(\s+)/).map((part, index) =>
        /\s+/.test(part) ? part : <span key={index} className={wash ? "studio-wash-word" : "studio-word"}><span>{part}</span></span>,
      );
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) return cloneElement(child, {}, words(child.props.children));
      return child;
    });
  }
  return <span ref={root}>{words(children)}</span>;
}
