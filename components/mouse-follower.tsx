"use client"

import { useEffect, useState } from "react"

interface SmokeParticle {
  id: number
  x: number
  y: number
  opacity: number
  size: number
  offsetX: number
  offsetY: number
}

export default function MouseFollower() {
  const [particles, setParticles] = useState<SmokeParticle[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let particleId = 0
    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)

      const newParticle: SmokeParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 0.6,
        size: Math.random() * 30 + 20,
        offsetX: (Math.random() - 0.5) * 20,
        offsetY: (Math.random() - 0.5) * 20,
      }

      setParticles((prev) => [...prev.slice(-15), newParticle])
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const animate = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            opacity: particle.opacity - 0.02,
            y: particle.y - 1,
            size: particle.size + 0.5,
          }))
          .filter((particle) => particle.opacity > 0),
      )
      animationFrame = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="pointer-events-none fixed top-0 left-0 z-50"
          style={{
            opacity: isVisible ? particle.opacity : 0,
            transform: `translate(${particle.x + particle.offsetX - particle.size / 2}px, ${particle.y + particle.offsetY - particle.size / 2}px)`,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div
            className="rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-transparent blur-xl"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        </div>
      ))}
    </>
  )
}
