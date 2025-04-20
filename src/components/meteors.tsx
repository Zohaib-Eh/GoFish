"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { useEffect, useState } from "react"

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number
  className?: string
}) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([])

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 1 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }))
    setMeteorStyles(styles)
  }, [number])

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className="absolute inline-block w-0.5 h-0.5 bg-cyan-500 rotate-[215deg]"
          style={{
            ...style,
            boxShadow: "0 0 0 1px #38bdf8",
          }}
        >
          <span className="absolute w-[50px] h-[1px] -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-transparent" />
        </span>
      ))}
    </div>
  )
}
