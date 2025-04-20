"use client"

import type React from "react"

import { ConnectWallet } from "@/components/ConnectWallet"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import WalletConnect from "@/components/walletconnectether"
// import { getContract } from "@/lib/contracts"
import { getSignedContract } from "@/lib/contracts"
import { ethers } from "ethers"
import { ArrowLeft, Check } from "lucide-react"
import { useState } from "react"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export default function ExportPaymentPage() {

  const [formData, setFormData] = useState({
    importerAddress: "",
    exporterAddress: "",
    paymentEther: "",
    paymentTerms: "",
    description: "",
  })


  async function getDetails() {

  }

  const [outputData, setOutputData] = useState<{
    importerKey: string
    exporterKey: string
    paymentWei: string
    terms: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async () => {
    try {
      // Convert ether to wei
      const paymentWei = ethers.parseEther(formData.paymentEther || "0").toString()

      // Set the output data
      setOutputData({
        importerKey: formData.importerAddress,
        exporterKey: formData.exporterAddress,
        paymentWei,
        terms: formData.paymentTerms,
      })

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await getSignedContract(signer);

      const tx = await contract.init(
        formData.exporterAddress,
        formData.importerAddress,
        paymentWei,
        parseInt(formData.paymentTerms) // cast to uint8
      );

      const receipt = await tx.wait();

      alert("you have successfully initiated this contract! here is the tx hash");
      alert(receipt.hash);

    } catch (error) {
      console.error("Error processing form:", error)
      alert("Please check your input values and try again.")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-100">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
          <h1 className="text-white text-2xl font-bold text-center">Add New Export Agreement</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="importerAddress">Importer Address</Label>
            <Input
              id="importerAddress"
              name="importerAddress"
              placeholder="Enter importer's public key"
              value={formData.importerAddress}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exporterAddress">Exporter Address</Label>
            <Input
              id="exporterAddress"
              name="exporterAddress"
              placeholder="Enter exporter's public key"
              value={formData.exporterAddress}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter export agreement description"
              value={formData.description}
              onChange={handleChange}
              className="resize-none h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentEther">Total Payment (ETH)</Label>
              <Input
                id="paymentEther"
                name="paymentEther"
                type="number"
                step="0.0001"
                placeholder="0.00"
                value={formData.paymentEther}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms (Months)</Label>
              <Input
                id="paymentTerms"
                name="paymentTerms"
                type="number"
                placeholder="0"
                value={formData.paymentTerms}
                onChange={handleChange}
              />
            </div>
          </div>

          <WalletConnect onConnect={() => { }} />


          <div className="flex justify-between pt-4">
            <Button variant="outline" type="button">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button onClick={handleSubmit} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <Check className="h-4 w-4 mr-2" />
              Accept
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
