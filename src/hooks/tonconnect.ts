import {
  isWalletInfoInjected,
  Wallet,
  WalletInfo,
  WalletInfoInjected,
  WalletInfoRemote,
} from "@tonconnect/sdk";
import WebApp from "@twa-dev/sdk";
import { useCallback, useContext, useEffect, useState } from "react";
import { TonConnectContext } from "../components/tonconnectprovider";

export function useTonConnect() {
  const connector = useContext(TonConnectContext);
  const [wallets, setWallets] = useState<WalletInfoRemote[]>([]);
  const [walletsEmbedded, setWalletsEmbedded] =
    useState<WalletInfoInjected | null>(null);

  useEffect(() => {
    (async () => {
      const list = await connector!.getWallets();
      setWallets(
        (list as WalletInfoRemote[]).filter((wallet) => wallet.universalLink)
      );
      setWalletsEmbedded(
        list.filter(isWalletInfoInjected).find((wallet) => wallet.embedded) ??
          null
      );
    })();
  }, []);

  const callbackConnect = useCallback(
    function connect(info: WalletInfoRemote) {
      if (walletsEmbedded) {
        connector?.connect({
          jsBridgeKey: walletsEmbedded.jsBridgeKey,
        });
        return;
      }
      const link = connector!.connect({
        universalLink: info.universalLink,
        bridgeUrl: info.bridgeUrl,
      });

      return link;
    },
    [wallets, connector]
  );
  const callbackDisconnect = useCallback(
    function disconnect() {
      connector?.disconnect();
    },
    [connector]
  );

  return {
    connect: callbackConnect,
    disconnect: callbackDisconnect,
    wallets,
    walletsEmbedded,
  };
}
