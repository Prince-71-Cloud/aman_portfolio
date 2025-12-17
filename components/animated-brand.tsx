"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AnimatedBrand() {
  return (
    <Link href="/" className="relative inline-block group">
      <div
        className={cn(
          "logo-container text-foreground group-hover:text-primary transition-colors",
          "relative inline-flex items-center justify-center"
        )}
      >
        <span
          className={cn(
            "logo-text",
            "inline-block font-bold text-2xl tracking-tighter",
            "font-serif italic",
            "relative z-10",
            "transition-all duration-300 ease-in-out",
            "group-hover:scale-105"
          )}
        >
          AB
          <span className="ping-pong-dot ml-1 inline-block w-[0.3em] h-[0.3em] align-[-0.1em] rounded-full bg-primary animate-ping-pong" />
        </span>
      </div>

      <style jsx global>{`
        @keyframes pingPongBounce {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          25% {
            transform: translate(4px, -6px);
            opacity: 0.9;
          }
          50% {
            transform: translate(0, 8px);
            opacity: 1;
          }
          75% {
            transform: translate(-4px, -5px);
            opacity: 0.9;
          }
          100% {
            transform: translate(0, 0);
            opacity: 1;
          }
        }

        .animate-ping-pong {
          animation: pingPongBounce 2.5s ease-in-out infinite;
        }
      `}</style>
    </Link>
  );
}
