"use client"
import { cn } from "@/lib/utils"
import { useRef, useEffect, useState } from "react"

export const MovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string
    name: string
    title: string
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  const getSpeed = () => {
    switch (speed) {
      case "fast":
        return 30
      case "normal":
        return 50
      case "slow":
        return 80
      default:
        return 50
    }
  }

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const handleMouseEnter = () => {
    if (containerRef.current && pauseOnHover) {
      containerRef.current.style.setProperty("--animation-play-state", "paused")
    }
  }

  const handleMouseLeave = () => {
    if (containerRef.current && pauseOnHover) {
      containerRef.current.style.setProperty("--animation-play-state", "running")
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative max-w-7xl overflow-hidden", className)}
      style={{
        "--animation-duration": `${getSpeed()}s`,
        "--animation-play-state": "running",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul ref={scrollerRef} className={cn("flex min-w-full shrink-0 gap-4 py-4", start && "animate-scroll")}>
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full flex-shrink-0 rounded-2xl border border-blue-700/20 bg-gradient-to-br from-blue-900/90 to-blue-950/90 backdrop-blur-sm px-8 py-6 md:w-[450px]"
          >
            <blockquote>
              <p className="text-white/80 mt-4 leading-relaxed">"{item.quote}"</p>
              <footer className="mt-6">
                <p className="text-base font-medium text-white">{item.name}</p>
                <p className="text-sm text-blue-300">{item.title}</p>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
          animation-direction: var(--animation-direction);
          animation-play-state: var(--animation-play-state);
        }
      `}</style>
    </div>
  )
}
