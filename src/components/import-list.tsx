"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContract, getSignedContract } from "@/lib/contracts"
import { ethers } from "ethers"
import { ChevronDownIcon, ChevronUpIcon, PackageIcon } from "lucide-react"
import { useState } from "react"
import WalletConnect from "./walletconnectether"

export function ImportList() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const imports = [
    {
      id: 1,
      name: "Import 1",
      status: "pending",
      amount: "$4,500.00",
      paid: "$2,250.00",
      date: "Mar 20, 2023",
      items: ["Furniture", "Electronics", "Textiles"],
      eta: "May 10, 2023",
    },
    {
      id: 2,
      status: "pending",
      name: "Import 2",
      amount: "$2,750.00",
      paid: "$1,375.00",
      date: "Apr 05, 2023",
      items: ["Machinery", "Raw Materials"],
      eta: "May 25, 2023",
    },
    {
      id: 3,
      status: "pending",
      name: "Import 3",
      amount: "$3,200.00",
      paid: "$800.00",
      date: "Apr 15, 2023",
      items: ["Chemicals", "Laboratory Equipment", "Medical Supplies"],
      eta: "Jun 02, 2023",
    },
  ]

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  async function getDocuments() {
    const readcontract = getContract();
    const d = await readcontract.getD();

    alert("gotcj")
    alert(d);


  }

  async function payUpfront() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await getSignedContract(signer);

    const readcontract = getContract();
    // read tp then multiply by 60 / 100
    const tp = await readcontract.tp();

    // todo finishup the allow mint function
    const amount = (tp * 60n) / 100n;

    alert(amount);

    const tx = await contract.pc({ value: amount });

    const receipt = await tx.wait();


    alert("paid");
    alert(receipt.hash);
  }

  async function allowMintToOwner() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await getSignedContract(signer);

    const tx = await contract.am();
    const receipt = await tx.wait();


    alert("paid");
    alert(receipt.hash);

  }

  async function Pay1stInstallment() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await getSignedContract(signer);

    const readcontract = getContract();
    // read tp then multiply by 60 / 100
    const tp = await readcontract.tp();
    const ca = await readcontract.ca();
    const pt = await readcontract.pt();



    // todo finishup the allow mint function
    const amount = (tp - ca) / pt;

    alert(amount);

    const tx = await contract.p({ value: amount });

    const receipt = await tx.wait();


    alert("paid");
    alert(receipt.hash);
  }

  async function Pay2ndInstallment() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await getSignedContract(signer);

    const readcontract = getContract();
    // read tp then multiply by 60 / 100
    const tp = await readcontract.tp();
    const ca = await readcontract.ca();
    const pt = await readcontract.pt();



    // todo finishup the allow mint function
    const amount = (tp - ca) / pt;

    alert(amount);

    const tx = await contract.p({ value: amount });

    const receipt = await tx.wait();


    alert("paid");
    alert(receipt.hash);
  }
  return (
    <Card className="border-none shadow-md bg-white">
      <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 pb-2">
        <CardTitle className="text-white font-light text-lg">Active Imports</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">

          <WalletConnect onConnect={() => { }} />
          <Button onClick={() => {
            getDocuments();
          }}>
            Get Documents
          </Button>
          <Button onClick={() => {
            payUpfront();
          }}>
            Pay 60%
          </Button>


          <Button onClick={() => {
            allowMintToOwner();
          }}>
            Allow Mint
          </Button>
          <Button onClick={() => {
            Pay1stInstallment();
          }}>
            Pay 1st Installment
          </Button>
          <Button onClick={() => {
            Pay2ndInstallment();
          }}>
            Pay 2nd Install ment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
