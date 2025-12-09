"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const keywords = ["SQA Engineer", "Cybersecurity Enthusiast", "Bug Hunter", "Tester"]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const currentWord = keywords[currentKeywordIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayedText !== currentWord) {
      // Typing - slower for aesthetic effect
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1))
      }, 150) // Increased from 100ms to 150ms
    } else if (!isDeleting && displayedText === currentWord) {
      // Wait before deleting - longer pause
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 4000) // Increased from 3000ms to 4000ms
    } else if (isDeleting && displayedText !== "") {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1))
      }, 80) // Slightly slower delete
    } else if (isDeleting && displayedText === "") {
      // Move to next word
      setIsDeleting(false)
      setCurrentKeywordIndex((prev) => (prev + 1) % keywords.length)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentKeywordIndex, keywords])

  return (
    <section className="py-20 px-4 overflow-hidden" id="hero">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`${isLoaded ? "fade-in" : "opacity-0"}`}>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-balance text-foreground">
              <div className="leading-tight">
                <div className="mb-2">Hi, I'm</div>
                <div className="text-primary font-extrabold mb-3">Aman Bhuiyan</div>
                <div className="min-h-[1.2em]">
                  <span className="gradient-text-animated font-extrabold">
                    {displayedText}
                    <span className="typing-cursor">|</span>
                  </span>
                </div>
              </div>
            </h1>
            <p className="text-xl text-foreground-secondary mb-8 leading-relaxed font-medium">
              I ensure quality, security, and performance through modern testing and ethical security research.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="#projects"
                className="glass-button bg-primary text-primary-foreground hover:bg-primary-light border-0 hover:shadow-primary/20"
              >
                View Projects
              </Link>
              <a
                href="https://drive.google.com/file/d/1MJO30jkCzX5Jyg9kNY0F-D1-R51HFjtf/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button hover:text-primary"
              >
                Download Resume
              </a>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold gradient-text">50+</span>
                <span className="text-sm text-foreground-secondary font-medium">Security Findings</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold gradient-text">7</span>
                <span className="text-sm text-foreground-secondary font-medium">Bug Bounty Programs</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
            <div
              className={`relative w-64 h-64 rounded-full glass-panel flex items-center justify-center overflow-hidden border-2 border-primary/20 shadow-2xl ${isLoaded ? "animate-float" : ""}`}
            >
              <img src="/images/pxl-20250718-095953598.jpg" alt="Aman Bhuiyan" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        /* More aesthetic gradient animation for text */
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .gradient-text-animated {
          background: linear-gradient(
            90deg,
            oklch(0.55 0.14 175),
            oklch(0.72 0.12 140),
            oklch(0.65 0.13 175),
            oklch(0.55 0.14 175)
          );
          background-size: 300% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        /* Blinking cursor animation */
        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }
        .typing-cursor {
          animation: blink 1s step-end infinite;
          color: oklch(0.55 0.14 175);
          -webkit-text-fill-color: oklch(0.55 0.14 175);
          font-weight: 300;
          margin-left: 2px;
        }
      `}</style>
    </section>
  )
}
