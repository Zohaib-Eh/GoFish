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
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { abi } from "../api/abi"

export default function ExportPaymentPage() {

  const { isConnected, address } = useAccount();


  const CONTRACT_ADDRESS =
    "0x01BBcf7461398Cb13AAC1D4B28FC917037AD750A0xabBd46Ef74b88E8B1CDa49BeFb5057710443Fd29" as `0x${string}`;


  // const { data, refetch } = useReadContract({
  //   address: CONTRACT_ADDRESS,
  //   abi,
  //   functionName: "imp",
  // });

  const { writeContract, data: hash, error, isPending } = useWriteContract();

  // alert(data);

  const [formData, setFormData] = useState({
    importerAddress: "",
    exporterAddress: "",
    paymentEther: "",
    paymentTerms: "",
    description: "",
  })


  async function getDetails() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await getSignedContract(signer);

    const tx = await contract.sd(ethers.encodeBytes32String("hello"));

    const receipt = await tx.wait();

    alert(receipt.hash);
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

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleSubmit = () => {
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



      alert(outputData);
    } catch (error) {
      console.error("Error processing form:", error)
      alert("Please check your input values and try again.")
    }
  }

  if (!isConnected) {
    return (<div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50">
      Please Connect your wallet to get started
      <ConnectWallet classnames={"my-2"} />
    </div>)
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

          <ConnectWallet classnames={""} />

          {/* <Button onClick={() => {
            writeContract({
              address: CONTRACT_ADDRESS,
              abi,
              functionName: "w",
              args: [],
            });
          }}>do transaction</Button> */}

          <WalletConnect onConnect={() => { }} />
          <Button onClick={() => {
            getDetails();
          }}>
            hi
          </Button>
          {/* <div>
            {isPending
              ? "Waiting for approval..."
              : isConfirming
                ? "Confirming..."
                : "Set Number"}
          </div> */}



          {/* {outputData && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Output Data:</h3>
              <div className="text-sm space-y-1 overflow-x-auto">
                <p>
                  <span className="font-medium">Importer Key:</span> {outputData.importerKey}
                </p>
                <p>
                  <span className="font-medium">Exporter Key:</span> {outputData.exporterKey}
                </p>
                <p>
                  <span className="font-medium">Payment (Wei):</span> {outputData.paymentWei}
                </p>
                <p>
                  <span className="font-medium">Terms (Months):</span> {outputData.terms}
                </p>
              </div>
            </div>
          )} */}

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
