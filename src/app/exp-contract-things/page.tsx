'use client';

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import WalletConnect from "@/components/walletconnectether";
import { getSignedContract } from "@/lib/contracts";
import { ethers } from "ethers";
import { useState } from "react";

export default function DashboardPage() {
    const [linkInput, setLinkInput] = useState("");
    const [status, setStatus] = useState("");

    async function cashout() {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = await getSignedContract(signer);

            const tx = await contract.w();
            const receipt = await tx.wait();

            setStatus(`✅ Cashout complete! Tx hash: ${receipt.hash}`);
        } catch (error) {
            console.error("Cashout failed:", error);
            setStatus("❌ Cashout failed. See console for details.");
        }
    }

    async function submitLink() {
        setStatus("");

        if (!linkInput.trim()) {
            setStatus("⚠️ Input cannot be empty.");
            return;
        }

        if (linkInput.length > 32) {
            setStatus("⚠️ Input must be 32 characters or fewer.");
            return;
        }

        let encoded;
        try {
            encoded = ethers.encodeBytes32String(linkInput);
        } catch (err) {
            setStatus("⚠️ Could not encode input. Use plain text only.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = await getSignedContract(signer);

            const tx = await contract.sd(encoded);
            const receipt = await tx.wait();

            setStatus(`✅ Submitted! Tx hash: ${receipt.hash}`);
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus("❌ Submission failed. See console for details.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader />
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <WalletConnect onConnect={() => { }} />

                        <Button onClick={cashout} className="mt-4">
                            Cashout
                        </Button>

                        <div className="mt-6">
                            <input
                                type="text"
                                value={linkInput}
                                onChange={(e) => setLinkInput(e.target.value)}
                                placeholder="Enter link or hash (max 32 characters)"
                                className="p-2 w-full rounded border border-gray-300 mb-2"
                            />
                            <Button onClick={submitLink}>Submit Link</Button>

                            {status && (
                                <p className="mt-3 text-sm text-blue-700 font-medium">{status}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
