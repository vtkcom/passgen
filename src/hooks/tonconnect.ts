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

  //   console.log(connector);

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
        const a = connector?.connect({
          jsBridgeKey: walletsEmbedded.jsBridgeKey,
        });
        console.log(a);

        return;
      }
      const link = connector?.connect({
        universalLink: info.universalLink,
        bridgeUrl: info.bridgeUrl,
      });

      if (link) WebApp.openLink(link);

      //   window.open(link, "_self", "noreferrer noopener");
      // return connector?.connect(info);
    },
    [wallets, connector]
  );

  return { connect: callbackConnect, wallets, walletsEmbedded };
}
