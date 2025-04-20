"use client"

import { Card, CardContent } from "@/components/ui/card"

interface ExportCardProps {
  exportId: string
  initialPayout: number
}

export function ExportCard({ exportId, initialPayout }: ExportCardProps) {
  return (
    <Card className="border-2 border-sky-100 shadow-sm">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-xl font-medium text-blue-900">
            Export {exportId} | Initial Payout = {initialPayout} GF
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}
