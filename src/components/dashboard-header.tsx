import { WavesIcon as WaveIcon } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <WaveIcon className="h-8 w-8 text-cyan-600" />
        <h1 className="text-3xl font-light tracking-tight text-slate-800">
          <span className="font-medium text-cyan-700">Ocean</span>Importer
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          <span className="text-sm text-slate-600">System Online</span>
        </div>
        <div className="relative">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition-colors">
            <span className="sr-only">User menu</span>
            <span className="text-sm font-medium">JD</span>
          </button>
        </div>
      </div>
    </div>
  )
}
