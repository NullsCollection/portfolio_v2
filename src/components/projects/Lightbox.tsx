"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}

const BTN =
  "h-[30px] min-w-[34px] cursor-pointer rounded-md border border-[var(--color-border)] px-[9px] font-mono text-xs text-text-secondary transition-colors hover:border-[var(--color-border-strong)] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";

/**
 * Native <dialog> image viewer: focus trap, Esc and inert background come
 * free. ← → step through every image, clicking the backdrop closes.
 */
export function Lightbox({
  images,
  index,
  alt,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const step = (by: number) =>
    onIndexChange((index + by + images.length) % images.length);

  // No cleanup on purpose: close() would fire onClose, and Strict Mode's
  // mount → unmount → mount in dev would then shut the viewer instantly.
  // Unmounting removes the dialog, which ends the modal state anyway.
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={`${alt} image viewer`}
      onClose={onClose}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (e.target === e.currentTarget) ref.current?.close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="m-auto max-h-[94vh] max-w-[min(1200px,94vw)] overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-0 text-text-primary backdrop:bg-[color-mix(in_srgb,var(--color-bg-base)_82%,transparent)] backdrop:backdrop-blur-[6px]"
    >
      <Image
        src={images[index]}
        alt={`${alt}, image ${index + 1}`}
        width={2400}
        height={1600}
        sizes="94vw"
        className="mx-auto block h-auto max-h-[calc(94vh-48px)] w-auto max-w-full object-contain"
      />
      <div className="flex h-12 items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] pl-4 pr-2.5">
        <span className="font-mono text-xs text-text-muted">
          {index + 1} / {images.length}
        </span>
        <span className="flex gap-1">
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className={BTN}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className={BTN}
              >
                →
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className={BTN}
          >
            Esc
          </button>
        </span>
      </div>
    </dialog>
  );
}
