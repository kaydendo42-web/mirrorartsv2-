"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { Plus } from "lucide-react";
import type { Asset } from "@/lib/content/types";
import Lightbox from "./lightbox";

/** The same photograph, same slot: an independently moving window and shutters. */
export default function ImageFrame({ asset, className = "", kind = "gallery", sizes, enlargeTitle, preload = false }: {
  asset: Asset;
  className?: string;
  kind?: "portrait" | "gallery" | "hero";
  sizes: string;
  enlargeTitle?: string;
  preload?: boolean;
}) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    let observer: IntersectionObserver | undefined;
    let cancelled = false;
    const cancel = () => animations.splice(0).forEach(a => a.cancel());
    const reveal = () => {
      if (cancelled || reduced.matches) return;
      const picture = el.querySelector(".image-frame__picture");
      if (picture) animations.push(picture.animate(
        [{ transform: "scale(1.12)" }, { transform: "scale(1)" }],
        { duration: 1050, easing: "cubic-bezier(.16,1,.3,1)" },
      ));
      el.querySelectorAll(".image-frame__shutter").forEach((shutter, i) => {
        animations.push(shutter.animate(
          [{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }],
          { duration: 820, delay: i * 65, easing: "cubic-bezier(.76,0,.24,1)", fill: "backwards" },
        ));
      });
    };
    const onPreference = () => { if (reduced.matches) cancel(); };
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        observer?.disconnect();
        const img = el.querySelector("img");
        // Wait for this particular image, never gate the page or hide its fallback.
        if (img?.decode) void img.decode().catch(() => {}).then(reveal);
        else reveal();
      }, { threshold: .12 });
      observer.observe(el);
    }
    reduced.addEventListener("change", onPreference);
    return () => { cancelled = true; observer?.disconnect(); cancel(); reduced.removeEventListener("change", onPreference); };
  }, [asset.src]);

  const picture = <span className="image-frame__window">
    <Image className="image-frame__picture" src={asset.src} alt={asset.alt} fill sizes={sizes} preload={preload} />
    <span className="image-frame__shutters" aria-hidden="true">
      <span className="image-frame__shutter" /><span className="image-frame__shutter" /><span className="image-frame__shutter" />
    </span>
    {enlargeTitle && <span className="image-frame__open" aria-hidden="true"><Plus size={18} strokeWidth={1.5} /></span>}
  </span>;

  return <span ref={root} className={`image-frame image-frame--${kind} ${className}`} style={{ "--image-ratio": `${asset.width} / ${asset.height}` } as CSSProperties}>
    {enlargeTitle ? <Lightbox title={enlargeTitle} description={asset.alt}
      trigger={<button className="image-frame__hit" type="button" aria-label={`Open photograph: ${enlargeTitle}`}>{picture}</button>}>
      <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} sizes="(min-width: 1200px) 1060px, 90vw" />
    </Lightbox> : picture}
  </span>;
}
