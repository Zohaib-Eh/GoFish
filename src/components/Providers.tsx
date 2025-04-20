'use client';

import { config } from '@/lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { WagmiProvider } from 'wagmi';

export default function Providers({ children }: {
    children: React.ReactNode
}) {

    // Create a query client
    const queryClient = new QueryClient();

    return (
        <>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </>
    )
}
