"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PaymentChart() {
  const [percentage, setPercentage] = useState(68)

  // Simulate percentage changes for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        const change = Math.floor(Math.random() * 5) - 2
        const newValue = prev + change
        return Math.min(Math.max(newValue, 0), 100)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="overflow-hidden border-none shadow-md bg-white">
      <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 pb-2">
        <CardTitle className="text-white font-light text-lg">Percentage Paid</CardTitle>
      </CardHeader>
      <Tabs defaultValue="chart" className="w-full">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="chart" className="mt-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-48 w-48">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${percentage * 2.51} 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-light text-slate-800">
                    {percentage}
                    <span className="text-xl">%</span>
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">Total amount paid across all imports</p>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="stats" className="mt-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Imports</span>
                <span className="font-medium text-slate-800">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Paid Amount</span>
                <span className="font-medium text-slate-800">$24,680.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Pending Amount</span>
                <span className="font-medium text-slate-800">$11,320.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Last Payment</span>
                <span className="font-medium text-slate-800">Apr 15, 2023</span>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
