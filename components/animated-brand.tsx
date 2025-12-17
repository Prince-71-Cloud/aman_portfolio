"use client";

import Link from "next/link";

export default function AnimatedBrand() {
  return (
    <Link href="/" className="relative inline-block group">
      <style>{`
        .logo-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Main logo text */
        .logo-text {
          display: inline-block;
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: -0.08em;
          font-family: Georgia, serif;
          font-style: italic;
          position: relative;
          z-index: 1;
          
          text-shadow: 
            2px 2px 0px rgba(0, 0, 0, 0.08),
            -0.5px -0.5px 0px rgba(255, 255, 255, 0.3);
          
          transition: all 0.3s ease;
        }

        /* Ping pong ball dot animation */
        .ping-pong-dot {
          display: inline-block;
          position: relative;
          width: 0.3em;
          height: 0.3em;
          margin-left: 0.15em;
          margin-right: 0.05em;
          vertical-align: -0.1em;
          animation: pingPongBounce 2.5s ease-in-out infinite;
        }

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

        .logo-container:hover .logo-text {
          transform: scale(1.05);
          text-shadow: 
            3px 3px 0px rgba(85, 192, 168, 0.3),
            -0.5px -0.5px 0px rgba(255, 255, 255, 0.4);
        }

        /* Desktop styles */
        @media (min-width: 768px) {
          .logo-text {
            font-size: 1.5rem;
          }
        }

        /* Mobile styles */
        @media (max-width: 767px) {
          .logo-text {
            font-size: 1.125rem;
          }
        }
      `}</style>

      <div className="logo-container text-foreground group-hover:text-primary transition-colors">
        <span className="logo-text">
          AB<span className="ping-pong-dot">.</span>
        </span>
      </div>
    </Link>
  );
}
