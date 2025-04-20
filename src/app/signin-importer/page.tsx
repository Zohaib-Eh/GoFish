'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInImporter() {

  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-blue-300 hover:text-blue-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-6">Sign In as Importer</h1>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-blue-950/50 border-blue-700/30 text-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-blue-950/50 border-blue-700/30 text-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-blue-700/30 bg-blue-950/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="#" className="text-blue-300 hover:text-blue-100">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button onClick={() => {
                localStorage.setItem("role", "exporter");
                localStorage.setItem("imgUrl", "")
                localStorage.setItem("name", "");
                localStorage.setItem("email", "");

                router.push('/dashboard-imp');
              }} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-blue-200">
                Don't have an account?{" "}
                <Link href="#" className="text-blue-300 hover:text-blue-100 font-medium">
                  Register
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <Button variant="outline" className="w-full border-blue-700/30 text-blue-100 hover:bg-blue-800/50">
                Connect to Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
