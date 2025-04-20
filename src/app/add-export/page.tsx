"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function AddExportPage() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    initialPayout: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { ...formData, file: fileName })
    // Handle form submission logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=600')] bg-cover bg-center opacity-20" />
          <div className="relative bg-gradient-to-r from-cyan-500/80 to-blue-500/80 p-6">
            <h1 className="text-2xl font-bold text-white text-center font-display">Add New Export</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-cyan-900 font-medium">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter export name"
              className="border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-cyan-900 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter export description"
              className="border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 transition-all min-h-[80px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-cyan-900 font-medium">Add File</Label>
              <div className="relative">
                <input type="file" id="file-upload" className="sr-only" onChange={handleFileChange} />
                <label
                  htmlFor="file-upload"
                  className={cn(
                    "flex items-center justify-center h-10 px-4 border rounded-md cursor-pointer transition-all",
                    fileName
                      ? "bg-cyan-50 border-cyan-300 text-cyan-700"
                      : "bg-white border-cyan-200 hover:bg-cyan-50 text-cyan-700",
                  )}
                >
                  {fileName ? (
                    <span className="truncate max-w-[120px]">{fileName}</span>
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialPayout" className="text-cyan-900 font-medium">
                Initial Payout
              </Label>
              <div className="relative">
                <Input
                  id="initialPayout"
                  name="initialPayout"
                  value={formData.initialPayout}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="pl-6 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 transition-all"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500">$</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              className="bg-white hover:bg-cyan-50 border-cyan-200 text-cyan-700 hover:text-cyan-800 transition-all"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transition-all"
            >
              <Check className="mr-2 h-4 w-4" />
              Accept
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
