"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* Three places on this site want a thumbnail on the page and the full image
 * one click away: the achievement scans, the original course posters, and the
 * room photographs. All three are documents rather than decoration — an AMEB
 * report and a Chinese course poster are only worth showing if they can be
 * read.
 *
 * Radix supplies the focus trap, the Escape handler, the scroll lock and the
 * aria-modal wiring. What is added here is the size: shadcn's DialogContent
 * caps at sm:max-w-sm, which is right for a confirmation and useless for a
 * poster, so the panel opens near the viewport instead.
 *
 * `title` is required and never optional. Radix warns without a DialogTitle,
 * and an image dialog that announces nothing is the case where a screen
 * reader lands inside a trap with no idea what it is looking at.
 */
export default function Lightbox({
  trigger,
  children,
  title,
  description,
}: {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="lightbox sm:max-w-[min(92vw,1100px)]">
        <DialogHeader className="lightbox__head">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="lightbox__body">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
