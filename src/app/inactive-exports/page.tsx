import { ExportCard } from "@/components/export-card"
import { PageHeader } from "@/components/page-header"

export default function InactiveExportsPage() {
  const inactiveExports = [
    { id: "X", initialPayout: 3000 },
    { id: "Y", initialPayout: 1500 },
    { id: "Z", initialPayout: 2400 },
    { id: "P", initialPayout: 1500 },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-sky-50">
      <PageHeader title="Inactive Exports" />

      <div className="space-y-4 my-8">
        {inactiveExports.map((export_) => (
          <ExportCard key={export_.id} exportId={export_.id} initialPayout={export_.initialPayout} />
        ))}
      </div>
    </div>
  )
}
