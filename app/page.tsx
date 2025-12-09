"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Services from "@/components/services"
import Activities from "@/components/activities"
import AcademicLife from "@/components/academic-life"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Blog from "@/components/blog"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import MouseFollower from "@/components/mouse-follower"
import SectionDivider from "@/components/section-divider"

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark, mounted])

  return (
    <main className="min-h-screen -space-y-20">
      <MouseFollower />
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Activities />
      <SectionDivider />
      <AcademicLife />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Blog />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  )
}
