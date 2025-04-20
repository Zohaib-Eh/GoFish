"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HistoryIcon, ChevronRightIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function HistoryButton() {
  const [open, setOpen] = useState(false)

  const historyItems = [
    { id: 1, date: "Apr 18, 2023", action: "Payment received", amount: "$2,450.00" },
    { id: 2, date: "Apr 15, 2023", action: "Import #3 created", amount: "$3,200.00" },
    { id: 3, date: "Apr 10, 2023", action: "Payment received", amount: "$1,800.00" },
    { id: 4, date: "Apr 05, 2023", action: "Import #2 created", amount: "$2,750.00" },
    { id: 5, date: "Mar 28, 2023", action: "Payment received", amount: "$3,100.00" },
    { id: 6, date: "Mar 20, 2023", action: "Import #1 created", amount: "$4,500.00" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="overflow-hidden border-none shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer">
          <Button
            variant="ghost"
            className="w-full h-16 justify-between px-6 rounded-none bg-gradient-to-r from-cyan-50 to-blue-50"
          >
            <div className="flex items-center gap-3">
              <HistoryIcon className="h-5 w-5 text-cyan-600" />
              <span className="font-medium text-slate-700">History</span>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-slate-400" />
          </Button>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-slate-800">
            Transaction <span className="font-medium text-cyan-700">History</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-3 max-h-[60vh] overflow-auto pr-2">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium text-slate-800">{item.action}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-800">{item.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
