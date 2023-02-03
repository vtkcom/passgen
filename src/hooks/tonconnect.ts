import { Wallet, WalletInfo } from "@tonconnect/sdk";
import { useContext, useEffect, useState } from "react";
import { TonConnectContext } from "../components/tonconnectprovider";

export function useTonConnect() {
  const connector = useContext(TonConnectContext);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  //   console.log(connector);

  useEffect(() => {
    (async () => setWallets((await connector?.getWallets()) ?? []))();
  }, []);

  function connect(info: WalletInfo) {
    console.log(connector?.connect(info));

    return connector?.connect(info);
  }

  return { connect, wallets };
}
