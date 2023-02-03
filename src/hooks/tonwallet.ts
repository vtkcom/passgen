import { Wallet, WalletInfo } from "@tonconnect/sdk";
import { useContext, useEffect, useState } from "react";
import { TonConnectContext } from "../components/tonconnectprovider";

export function useTonWallet() {
  const connector = useContext(TonConnectContext);
  const [wallet, setWallet] = useState<Wallet | null>(
    connector?.wallet ?? null
  );

  useEffect(() => {
    connector?.onStatusChange((value) => {
      console.log("change status");

      setWallet(value);
    });
  }, [connector]);

  return wallet;
}
