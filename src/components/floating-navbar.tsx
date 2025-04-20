"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"
import { ConnectWallet } from "./ConnectWallet"

export const FloatingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed top-4 inset-x-0 max-w-2xl mx-auto z-50 transition-all duration-300 ${scrolled ? "bg-blue-950/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        } rounded-full border border-white/10`}
    >
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-white font-bold text-xl">
          GO FISH
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavItem href="/about">About</NavItem>
          <NavItem href="/features">Features</NavItem>
          <NavItem href="/pricing">Pricing</NavItem>
          <NavItem href="/contact">Contact</NavItem>
          {/* <Button className="ml-2 hover:cursor-pointer bg-white text-blue-900 hover:bg-blue-50" size="sm">
            Connect to Wallet
          </Button> */}
          <ConnectWallet classnames={"ml-2 hover:cursor-pointer bg-white text-blue-900 hover:bg-blue-50"} />
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-950 border-t border-white/10 rounded-b-2xl overflow-hidden">
          <div className="flex flex-col p-4 gap-2">
            <MobileNavItem href="/about">About</MobileNavItem>
            <MobileNavItem href="/features">Features</MobileNavItem>
            <MobileNavItem href="/pricing">Pricing</MobileNavItem>
            <MobileNavItem href="/contact">Contact</MobileNavItem>
            <Button className="mt-2 bg-white text-blue-900 hover:bg-blue-50">Connect to Wallet</Button>
          </div>
        </div>
      )}
    </div>
  )
}

const NavItem = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <Link href={href} className="text-sm text-white/80 hover:text-white px-4 py-2 rounded-full transition-colors">
      {children}
    </Link>
  )
}

const MobileNavItem = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <Link href={href} className="text-white/80 hover:text-white py-3 px-4 border-b border-white/10 transition-colors">
      {children}
    </Link>
  )
}
