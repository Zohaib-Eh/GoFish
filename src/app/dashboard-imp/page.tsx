import { DashboardHeader } from "@/components/dashboard-header"
import { ImportList } from "@/components/import-list"
import { PaymentChart } from "@/components/payment-chart"
import { HistoryButton } from "@/components/history-button"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <PaymentChart />
            <HistoryButton />
          </div>
          <div className="lg:col-span-7">
            <ImportList />
          </div>
        </div>
      </div>
    </div>
  )
}
