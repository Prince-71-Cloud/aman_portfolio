"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function AnimatedBrand() {
  const [text, setText] = useState("AB");
  const [dotPosition, setDotPosition] = useState(0);

  // Animation states for the logo text
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Cycle through different text options
    const texts = ["AB", "A.", "Am", "AmB", "A.B"];
    let currentIndex = 0;

    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setText(texts[currentIndex]);
    }, 3000);

    // Animate the dot in a ping-pong motion
    const dotInterval = setInterval(() => {
      setDotPosition(prev => (prev + 1) % 100);
    }, 50);

    // Add text animation on hover effect simulation
    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotInterval);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <Link
      href="/"
      className={cn(
        "relative inline-block group",
        "hover:scale-105 transition-transform duration-300"
      )}
    >
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
            isAnimating ? "animate-pulse" : "",
            "group-hover:scale-110"
          )}
        >
          {text}
          <span
            className="ping-pong-dot ml-1 inline-block w-[0.3em] h-[0.3em] rounded-full bg-primary"
            style={{
              transform: `translate(${Math.sin(dotPosition * Math.PI / 50) * 4}px, ${Math.cos(dotPosition * Math.PI / 30) * 3}px)`,
              transition: 'transform 0.05s linear',
              display: 'inline-block',
              verticalAlign: '-0.1em'
            }}
          />
        </span>
      </div>
    </Link>
  );
}
