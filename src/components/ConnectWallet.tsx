"use client";

import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "./ui/button";

export function ConnectWallet({ classnames }: {
  classnames: any;
}) {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <div>Connected to {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <Button className={classnames} onClick={() => connect({ connector: injected() })}>
      Connect Wallet
    </Button>
  );
}