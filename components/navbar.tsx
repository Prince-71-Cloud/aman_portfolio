"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, Moon, Menu, X, FileText } from "lucide-react"

interface NavbarProps {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showIceCream, setShowIceCream] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIceCream((prev) => !prev)
    }, 3000) // Toggle every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Notes", href: "/notes", isSpecial: true },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-bold text-foreground hover:text-primary transition-colors group">
            <span className="relative inline-block">
              <span
                className={`inline-flex items-center gap-1.5 transition-all duration-500 ${
                  showIceCream ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              >
                AB
                <span className="relative flex h-2 w-2 animate-bounce-ball">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </span>
              <span
                className={`absolute left-0 top-0 inline-flex items-center gap-1.5 transition-all duration-500 ${
                  showIceCream ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                IceCream
                <span className="relative flex h-2 w-2 animate-bounce-ball">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  link.isSpecial
                    ? "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground"
                }`}
              >
                {link.isSpecial && <FileText className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  link.isSpecial
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.isSpecial && <FileText className="w-4 h-4 inline-block mr-2" />}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
