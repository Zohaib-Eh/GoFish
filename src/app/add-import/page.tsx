"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

type ExportCompany = {
  name: string
  payout: number
  description: string
}

export default function ImportPage() {
  const [selectedExport, setSelectedExport] = useState<ExportCompany | null>(null)

  const exportCompanies: ExportCompany[] = [
    {
      name: "X",
      payout: 3000,
      description:
        "Company X is looking for premium seafood imports including salmon, tuna, and lobster. They require weekly deliveries and guarantee payment within 7 days of receipt.",
    },
    {
      name: "Y",
      payout: 1500,
      description:
        "Company Y specializes in exotic fish varieties from Southeast Asia. They're seeking reliable suppliers who can provide consistent quality.",
    },
    {
      name: "Z",
      payout: 2400,
      description:
        "Company Z is a high-end restaurant chain requiring premium quality fish. They demand strict adherence to sustainability practices.",
    },
    {
      name: "P",
      payout: 1500,
      description:
        "Company P focuses on processed fish products. They're looking for bulk suppliers of various fish types and offer competitive rates.",
    },
  ]

  return (
    <main className={cn("min-h-screen bg-gradient-to-b from-blue-50 to-blue-100", montserrat.className)}>
      <div className="max-w-4xl mx-auto">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="flex items-center justify-center mb-8">
              <Image
                src="/placeholder.svg?height=60&width=60"
                width={60}
                height={60}
                alt="GoFish Logo"
                className="mr-3"
              />
              <h1 className="text-4xl font-bold text-cyan-800">GoFish</h1>
            </div>

            <div className="relative">
              <Card className="border-2 border-cyan-200 bg-white/80">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center text-cyan-800 py-3 border-b-2 border-cyan-100">
                      Add New Import
                    </h2>

                    <div className="space-y-3 pt-2">
                      {exportCompanies.map((company) => (
                        <button
                          key={company.name}
                          onClick={() => setSelectedExport(company)}
                          className="w-full h-12 flex items-center justify-center bg-white border border-cyan-200 hover:bg-blue-50 transition-colors duration-200 rounded-md"
                        >
                          <span className="font-medium">
                            Export {company.name} | Initial Payout = {company.payout} GF
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Export Description Modal */}
          {selectedExport && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-md rounded-md overflow-hidden">
                <div className="border-b p-4">
                  <h3 className="text-center font-medium">
                    Export {selectedExport.name} | Initial Payout {selectedExport.payout} GF
                  </h3>
                </div>

                <div className="p-6 min-h-[200px] flex items-center justify-center border-b">
                  <div className="text-center">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p>{selectedExport.description}</p>
                  </div>
                </div>

                <div className="flex justify-between p-4">
                  <Button variant="outline" onClick={() => setSelectedExport(null)} className="px-8">
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      alert(`Accepted export from Company ${selectedExport.name}!`)
                      setSelectedExport(null)
                    }}
                    className="px-8 bg-cyan-600 hover:bg-cyan-700"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
