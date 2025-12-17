"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sun, Moon, Menu, X, FileText } from "lucide-react";
import AnimatedBrand from "./animated-brand";

interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Notes", href: "/notes", isSpecial: true },
  ];

  // Function to handle hash navigation
  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const elementId = href.substring(1); // Remove the # symbol
      const element = document.getElementById(elementId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Adjust for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });

        // Update URL hash without causing page refresh
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isScrolled
        ? "bg-background/80 border-border/40"
        : "bg-background/60 border-white/20 dark:border-white/10"
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="relative inline-block group">
            <div className="jsx-ec0a49874dfdc10a logo-container text-foreground group-hover:text-primary transition-colors relative inline-flex items-center justify-center">
              <span className="jsx-ec0a49874dfdc10a logo-text inline-block font-bold text-2xl tracking-tighter font-serif italic relative z-10 transition-all duration-300 ease-in-out group-hover:scale-105">
                AB<span className="jsx-ec0a49874dfdc10a ping-pong-dot ml-1 inline-block w-[0.3em] h-[0.3em] align-[-0.1em] rounded-full bg-primary animate-ping-pong"></span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleHashNavigation(e, link.href)}
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
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
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
                onClick={(e) => {
                  handleHashNavigation(e, link.href);
                  setIsOpen(false);
                }}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  link.isSpecial
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.isSpecial && (
                  <FileText className="w-4 h-4 inline-block mr-2" />
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
