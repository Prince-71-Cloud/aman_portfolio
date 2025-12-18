"use client"

export default function SectionDivider() {
  return (
    <div className="relative w-full h-px my-8 overflow-hidden">
      {/* Base gradient line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-shimmer" />
    </div>
  )
}
