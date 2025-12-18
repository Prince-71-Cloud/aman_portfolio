"use client"

import { useState, useEffect } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-[9999] w-14 h-14 md:w-16 md:h-16 rounded-full 
                     bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 
                     flex items-center justify-center 
                     shadow-2xl shadow-emerald-500/50 
                     border-2 border-white/30 
                     hover:scale-110 hover:shadow-emerald-500/70 hover:-translate-y-1
                     active:scale-95
                     transition-all duration-300 ease-out
                     animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 md:w-8 md:h-8 text-white"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}

      <footer className="border-t border-white/20 bg-white/5 backdrop-blur-lg py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-foreground-secondary text-sm">© {currentYear} Aman Bhuiyan. All rights reserved.</p>
              <p className="text-foreground-secondary/40 text-xs">Designed with v0 AI</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
