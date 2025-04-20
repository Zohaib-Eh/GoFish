"use client"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { createNoise3D } from "simplex-noise"

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
}: {
  id: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [particles, setParticles] = useState<any[]>([])
  const noise = createNoise3D()
  const animationRef = useRef<number | null>(null)

  const resizeCanvas = () => {
    if (canvasRef.current && context) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      setContext(ctx)
    }

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (context) {
      resizeCanvas()
      initParticles()
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [context])

  const initParticles = () => {
    const particlesArray = []
    const numberOfParticles = (particleDensity || 100) * (window.innerWidth / 1920)

    for (let i = 0; i < numberOfParticles; i++) {
      const particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * ((maxSize || 3) - (minSize || 1)) + (minSize || 1),
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.5,
      }
      particlesArray.push(particle)
    }

    setParticles(particlesArray)
  }

  const animate = () => {
    if (!context || !canvasRef.current) return

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    if (background) {
      context.fillStyle = background
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    const updatedParticles = [...particles]

    for (let i = 0; i < updatedParticles.length; i++) {
      const particle = updatedParticles[i]

      // Use noise to create more natural movement
      const time = Date.now() * (speed || 0.0005)
      const noiseX = noise(particle.x * 0.01, particle.y * 0.01, time) * 0.5
      const noiseY = noise(particle.x * 0.01, particle.y * 0.01, time + 100) * 0.5

      particle.x += particle.speedX + noiseX
      particle.y += particle.speedY + noiseY

      if (particle.x > window.innerWidth) {
        particle.x = 0
      } else if (particle.x < 0) {
        particle.x = window.innerWidth
      }

      if (particle.y > window.innerHeight) {
        particle.y = 0
      } else if (particle.y < 0) {
        particle.y = window.innerHeight
      }

      // Draw particle
      context.beginPath()
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      context.fillStyle = particleColor || "#ffffff"
      context.globalAlpha = particle.opacity
      context.fill()
    }

    setParticles(updatedParticles)
    animationRef.current = requestAnimationFrame(animate)
  }

  return <canvas ref={canvasRef} id={id} className={cn("opacity-70", className)} />
}
