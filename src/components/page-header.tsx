import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  className?: string
}

export function PageHeader({ title, className }: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-8", className)}>
      <h1 className="text-3xl font-bold text-blue-600">{title}</h1>
    </div>
  )
}
