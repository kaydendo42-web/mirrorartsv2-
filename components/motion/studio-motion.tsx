"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive motion: nothing is hidden in CSS waiting for JavaScript. */
export default function StudioMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const hero = document.querySelector<HTMLElement>(".hero__video");
    const film = hero instanceof HTMLVideoElement ? hero : null;
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    function configure() {
      observer?.disconnect();
      animations.splice(0).forEach((a) => a.cancel());
      if (mediaQuery.matches) {
        if (hero) hero.style.transform = "";
        document.querySelectorAll<HTMLElement>(".studio-wash-word").forEach(word => { word.style.color = ""; });
        film?.pause();
        return;
      }
      film?.play().catch(() => {});
      const page = document.querySelector(".phero");
      page?.querySelectorAll(".page-cue > span").forEach((panel, i) => {
        animations.push(panel.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }],
          { duration: 920, delay: i * 55, easing: "cubic-bezier(.76,0,.24,1)", fill: "backwards" }));
      });
      if (!("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          const isImage = element.matches(".card__frame, .room__hit, .vfig__frame");
          const rect = element.getBoundingClientRect();
          // A restored scroll position should never replay an already-passed scene.
          if (rect.bottom < 0) continue;
          const animation = element.animate(
            isImage
              ? [{ clipPath: "inset(0 0 15% 0)", transform: "translateY(18px)" }, { clipPath: "inset(0)", transform: "translateY(0)" }]
              : [{ opacity: .55, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: isImage ? 1100 : 850, easing: "cubic-bezier(.16,1,.3,1)" },
          );
          animations.push(animation);
        }
      }, { threshold: .08, rootMargin: "0px 0px -35px 0px" });
      document.querySelectorAll(".sect__head, .card__frame, .room__hit, .vfig__frame, .creed, .tl__item, .band__in").forEach(el => observer?.observe(el));
    }

    const onScroll = () => {
      if (frame || mediaQuery.matches) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const reel = document.querySelector<HTMLElement>(".reel");
        if (!reel || !hero) return;
        const top = reel.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, -top / Math.max(1, innerHeight)));
        hero.style.transform = `scale(${1.04 + progress * .04})`;
        const wash = document.querySelector<HTMLElement>(".wash__in");
        if (wash) {
          const words = wash.querySelectorAll<HTMLElement>(".studio-wash-word");
          const y = wash.getBoundingClientRect().top;
          const reveal = Math.min(1, Math.max(0, (innerHeight * .9 - y) / (innerHeight * .6)));
          words.forEach((word, i) => {
            word.style.color = reveal >= i / words.length ? "" : "#625071";
          });
        }
      });
    };
    configure();
    onScroll();
    mediaQuery.addEventListener("change", configure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      animations.forEach(a => a.cancel());
      cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", configure);
      window.removeEventListener("scroll", onScroll);
      if (hero) hero.style.transform = "";
    };
  }, [pathname]);

  return null;
}
