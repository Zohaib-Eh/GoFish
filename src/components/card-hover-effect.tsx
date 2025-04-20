"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"

export const CardHoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    icon: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity",
              hoveredIndex === idx ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            className={cn(
              "relative h-full w-full p-6 rounded-xl bg-blue-900/50 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-all duration-300",
              hoveredIndex === idx ? "translate-x-2 translate-y-2" : "translate-x-0 translate-y-0",
            )}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-white/70 text-center">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
