import Link from "next/link"
import { WavyBackground } from "../components/wavy-background"
import { SparklesCore } from "../components/sparkles"
import { FloatingNavbar } from "../components/floating-navbar"
import { CardHoverEffect } from "../components/card-hover-effect"
import { MovingCards } from "../components/moving-cards"
import { Button } from "@/components/ui/button"

export default function Home() {
  const testimonials = [
    {
      quote: "GO FISH revolutionized our seafood import process. Highly recommended!",
      name: "Sarah Johnson",
      title: "Seafood Importer",
    },
    {
      quote: "The platform simplified our export documentation and compliance.",
      name: "Michael Chen",
      title: "Export Manager",
    },
    {
      quote: "Connecting with global partners has never been easier.",
      name: "Elena Rodriguez",
      title: "Supply Chain Director",
    },
  ]

  const features = [
    {
      title: "Global Marketplace",
      description: "Connect with seafood suppliers and buyers from around the world",
      icon: "🌊",
    },
    {
      title: "Verified Partners",
      description: "All partners are verified for quality and compliance",
      icon: "🐟",
    },
    {
      title: "Secure Transactions",
      description: "End-to-end encrypted payment processing",
      icon: "🔒",
    },
    {
      title: "Real-time Tracking",
      description: "Track your shipments in real-time across oceans",
      icon: "🚢",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Floating Navigation */}
      <FloatingNavbar />

      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <WavyBackground className="w-full h-full">
          <div className="flex flex-col items-center justify-center z-10 px-4 py-16 md:py-32 relative">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={70}
              className="w-full h-full absolute inset-0"
              particleColor="#88CCFF"
            />

            <h1 className="text-4xl md:text-7xl font-bold text-center text-white mb-8 drop-shadow-lg">GO FISH</h1>
            <p className="text-xl md:text-2xl text-center text-white/80 max-w-2xl mb-12">
              The premier platform connecting seafood importers and exporters worldwide
            </p>

            <div className="flex flex-col sm:flex-row gap-4 z-10">
              <Link href="/signin-importer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-blue-500/20">
                  Sign In as Importer
                </Button>
              </Link>
              <Link href="/signin-exporter">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-teal-500/20">
                  Sign In as Exporter
                </Button>
              </Link>
            </div>
          </div>
        </WavyBackground>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">Dive Into Our Features</h2>

          <CardHoverEffect items={features} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-blue-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">What Our Users Say</h2>

          <MovingCards items={testimonials} direction="right" speed="slow" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-t from-blue-900 to-blue-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Dive In?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
            Join thousands of seafood businesses already using GO FISH to connect globally
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin-importer">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-blue-500/20">
                Sign In as Importer
              </Button>
            </Link>
            <Link href="/signin-exporter">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-teal-500/20">
                Sign In as Exporter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-blue-950 border-t border-blue-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-white">GO FISH</h3>
              <p className="text-blue-300 mt-2">Connecting oceans of opportunity</p>
            </div>

            <div className="flex gap-8">
              <Link href="/about" className="text-blue-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-blue-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-blue-300 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-blue-300 hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center text-blue-400 text-sm">
            &copy; {new Date().getFullYear()} GO FISH. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
