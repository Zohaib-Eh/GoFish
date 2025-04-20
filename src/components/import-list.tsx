"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PackageIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

export function ImportList() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const imports = [
    {
      id: 1,
      name: "Import 1",
      status: "pending",
      amount: "$4,500.00",
      paid: "$2,250.00",
      date: "Mar 20, 2023",
      items: ["Furniture", "Electronics", "Textiles"],
      eta: "May 10, 2023",
    },
    {
      id: 2,
      status: "pending",
      name: "Import 2",
      amount: "$2,750.00",
      paid: "$1,375.00",
      date: "Apr 05, 2023",
      items: ["Machinery", "Raw Materials"],
      eta: "May 25, 2023",
    },
    {
      id: 3,
      status: "pending",
      name: "Import 3",
      amount: "$3,200.00",
      paid: "$800.00",
      date: "Apr 15, 2023",
      items: ["Chemicals", "Laboratory Equipment", "Medical Supplies"],
      eta: "Jun 02, 2023",
    },
  ]

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <Card className="border-none shadow-md bg-white">
      <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 pb-2">
        <CardTitle className="text-white font-light text-lg">Active Imports</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {imports.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border border-slate-100 transition-all duration-200"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-colors"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-center gap-3">
                  <PackageIcon className="h-5 w-5 text-cyan-600" />
                  <div>
                    <h3 className="font-medium text-slate-800">{item.name}</h3>
                    <p className="text-xs text-slate-500">Created on {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                    Pending {item.amount}
                  </Badge>
                  {expandedId === item.id ? (
                    <ChevronUpIcon className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>

              {expandedId === item.id && (
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-500">Total Amount</p>
                        <p className="font-medium text-slate-800">{item.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Paid Amount</p>
                        <p className="font-medium text-slate-800">{item.paid}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Estimated Arrival</p>
                        <p className="font-medium text-slate-800">{item.eta}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-500">Items</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.items.map((itemName, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {itemName}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                          Make Payment
                        </Button>
                        <Button size="sm" variant="outline" className="border-cyan-200 text-cyan-700 hover:bg-cyan-50">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
