"use client"

import { useState } from "react"
import Link from "next/link"
import { Sun, Moon, Menu, X, Shield } from "lucide-react"

interface NavbarProps {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Academic", href: "#academic" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 dark:bg-[#0a1638]/60 border-b border-white/20 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Shield className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all text-slate-800 dark:text-white shadow-sm"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/20 dark:border-white/10 bg-white/80 dark:bg-[#0a1638]/80 backdrop-blur-lg">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
