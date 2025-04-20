'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function SignInExporter() {

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-900 to-blue-950">
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-teal-300 hover:text-teal-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="bg-teal-900/40 backdrop-blur-sm p-8 rounded-2xl border border-teal-700/30 shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-6">Sign In as Exporter</h1>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-teal-100 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-teal-950/50 border-teal-700/30 text-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-teal-100 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-teal-950/50 border-teal-700/30 text-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-teal-700/30 bg-teal-950/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-teal-100">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="#" className="text-teal-300 hover:text-teal-100">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button onClick={() => {
                localStorage.setItem("role", "exporter");
                localStorage.setItem("imgUrl", "")
                localStorage.setItem("name", "");
                localStorage.setItem("email", "");

                router.push('/dashboard-exp');


              }} className="w-full bg-teal-600 hover:bg-teal-700 text-white">Sign In</Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-teal-200">
                Don't have an account?{" "}
                <Link href="#" className="text-teal-300 hover:text-teal-100 font-medium">
                  Register
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <Button variant="outline" className="w-full border-teal-700/30 text-teal-100 hover:bg-teal-800/50">
                Connect to Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
