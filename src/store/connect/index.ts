import TonConnect, {
  type Wallet,
  type WalletInfo,
  toUserFriendlyAddress,
  WalletInfoRemote,
} from "@tonconnect/sdk";
import WebApp from "@twa-dev/sdk";
import { StoreonModule } from "storeon";

const connector = new TonConnect({
  manifestUrl: "https://vtkcom.github.io/passgen/tonconnect-manifest.json",
});

connector.restoreConnection();

export interface State {
  connect: {
    wallet: string | null;
    url: string | null;
    wallets: {
      isLoading: boolean;
      data: WalletInfo[];
    };
  };
}

export interface Event {
  "connect/url": { wallet: WalletInfo };

  "connect/off": undefined;

  "#connect/data/set": { wallet: string | null; url: string | null };

  "connect/wallets": undefined;
  "#connect/wallets/req": undefined;
  "#connect/wallets/res": { wallets: WalletInfo[] };
}

const initState: State = {
  connect: {
    wallet: null,
    url: null,
    wallets: {
      isLoading: false,
      data: [],
    },
  },
};

export const connect: StoreonModule<State, Event> = (store) => {
  connector.onStatusChange(
    async (wallet) => {
      if (wallet === null) {
        store.dispatch("#connect/data/set", { wallet: null, url: null });
        WebApp.HapticFeedback.notificationOccurred("success");
      } else {
        store.dispatch("#connect/data/set", {
          wallet: toUserFriendlyAddress(wallet.account.address),
          url: null,
        });
      }
    },
    (err) => {
      console.log("error", err.message);
      console.log(err.name);
    }
  );

  store.on("@init", () => ({ ...initState }));

  store.on("#connect/data/set", (state, { wallet, url }) => ({
    connect: {
      ...state.connect,
      wallet,
      url,
    },
  }));

  store.on("connect/url", (state, { wallet }) => {
    const url = connector.connect({
      universalLink: (wallet as WalletInfoRemote).universalLink,
      bridgeUrl: (wallet as WalletInfoRemote).bridgeUrl,
    });

    if (url) {
      return {
        connect: {
          ...state.connect,
          url,
        },
      };
    }
  });

  store.on("connect/off", async () => {
    await connector.disconnect();

    store.dispatch("#connect/data/set", { wallet: null, url: null });
  });

  store.on("#connect/wallets/req", (state) => ({
    connect: { ...state.connect, wallets: { isLoading: true, data: [] } },
  }));

  store.on("#connect/wallets/res", (state, { wallets }) => ({
    connect: { ...state.connect, wallets: { isLoading: false, data: wallets } },
  }));

  store.on("connect/wallets", async () => {
    store.dispatch("#connect/wallets/req");

    const wallets = await connector.getWallets();

    store.dispatch("#connect/wallets/res", { wallets });
  });
};
