'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2, ChevronRight, Clock, DollarSign, History, Package } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-sky-700">GoFish</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg?height=32&width=32"
                width="32"
                height="32"
                className="rounded-full"
                alt="Avatar"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </nav>
        </div>
      </header>
      <main className="container px-4 py-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Monitor your exports and financial status</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Last updated: 5 mins ago
            </Button>
            <Button variant="default" size="sm" className="bg-sky-600 hover:bg-sky-700" onClick={() => {
              router.push('/make-new-contract');
            }}>
              Add New Contract
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="overflow-hidden border-sky-100 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-sky-100 to-blue-100 pb-2">
              <CardTitle className="text-lg font-medium text-sky-800">Number of Exports</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-sky-600" />
                  <span className="text-2xl font-bold text-gray-900">24</span>
                </div>
                <Badge variant="outline" className="bg-sky-50 text-sky-700">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-sky-100 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-sky-100 to-blue-100 pb-2">
              <CardTitle className="text-lg font-medium text-sky-800">Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="text-xl font-medium text-gray-900">Inactive</span>
                </div>
                <Button size="sm" variant="outline" className="text-sky-600">
                  Activate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-sky-100 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-sky-100 to-blue-100 pb-2">
              <CardTitle className="text-lg font-medium text-sky-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 pt-6">
              <Button size="sm" variant="outline" className="flex-1">
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <BarChart2 className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="border-sky-100 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-sky-100 to-blue-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-sky-800">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Total Money in Wallet
                  </div>
                </CardTitle>
                <span className="text-2xl font-bold text-sky-700">$24,500.00</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" className="w-full">
                <div className="border-b px-4">
                  <TabsList className="bg-transparent">
                    <TabsTrigger value="all" className="data-[state=active]:bg-sky-50">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="received" className="data-[state=active]:bg-sky-50">
                      Received
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="data-[state=active]:bg-sky-50">
                      Pending
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all" className="m-0">
                  <ExportList />
                </TabsContent>
                <TabsContent value="received" className="m-0">
                  <ExportList filter="received" />
                </TabsContent>
                <TabsContent value="pending" className="m-0">
                  <ExportList filter="pending" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ExportList({ filter }: { filter?: string }) {
  const exports = [
    { id: 1, name: "Export 1", received: 5200, pending: 1800, status: "active" },
    { id: 2, name: "Export 2", received: 8700, pending: 3200, status: "active" },
    { id: 3, name: "Export 3", received: 4300, pending: 1500, status: "active" },
  ]

  return (
    <div className="divide-y">
      {exports.map((exp) => (
        <div key={exp.id} className="flex items-center justify-between p-4 hover:bg-sky-50">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
              <Package className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{exp.name}</h3>
              <div className="flex gap-3 text-sm text-gray-500">
                <span className="flex items-center text-emerald-600">Received: ${exp.received.toLocaleString()}</span>
                <span className="flex items-center text-amber-600">Pending: ${exp.pending.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
