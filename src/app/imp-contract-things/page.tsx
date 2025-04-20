'use client';

import { ConnectWallet } from "@/components/ConnectWallet";
import { DashboardHeader } from "@/components/dashboard-header";
import { HistoryButton } from "@/components/history-button";
import { ImportList } from "@/components/import-list";
import { PaymentChart } from "@/components/payment-chart";
import { useAccount } from "wagmi";

export default function DashboardPage() {



    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader />
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">

                    <div className="lg:col-span-7">
                        <ImportList />
                    </div>
                </div>
            </div>
        </div>
    )
}
