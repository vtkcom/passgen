import TonConnect, {
  type Wallet,
  type WalletInfo,
  toUserFriendlyAddress,
  WalletInfoRemote,
} from "@tonconnect/sdk";
import WebApp from "@twa-dev/sdk";
import { StoreonModule } from "storeon";
import { DNSApi, NFTApi, Configuration } from "tonapi-sdk-js";

const connector = new TonConnect({
  manifestUrl: "https://vtkcom.github.io/passgen/tonconnect-manifest.json",
});

connector.restoreConnection();

export interface State {
  profile: {
    isLoading: boolean;
    isFinish: boolean;
    error: string | null;
    addressWallet: string | null;
    dns: string | null;
    avatar: string | null;
    wallet: Wallet | null;
    wallets: {
      isLoading: boolean;
      data: WalletInfo[];
    };
    connect: {
      isLoading: boolean;
      data: string | null;
    };
  };
}

export interface Event {
  "profile/wallet/update": {
    wallet: Wallet | null;
    dns: string | null;
    avatar: string | null;
  };

  "profile/disconnect": undefined;
  "#profile/disconnect": undefined;

  "profile/wallets/get": undefined;
  "#profile/wallets/req": undefined;
  "#profile/wallets/res": { wallets: WalletInfo[] };

  "profile/preconnect": { wallet: WalletInfo };
  "#profile/preconnect/req": undefined;
  "#profile/preconnect/res": { url: string };
}

const initState: State = {
  profile: {
    isLoading: true,
    isFinish: false,
    wallet: null,
    addressWallet: null,
    dns: null,
    avatar: null,
    error: null,
    wallets: {
      isLoading: true,
      data: [],
    },
    connect: {
      isLoading: false,
      data: null,
    },
  },
};

export const profile: StoreonModule<State, Event> = (store) => {
  connector.onStatusChange(
    async (wallet) => {
      console.log("update", wallet);

      if (wallet === null) {
        store.dispatch("#profile/disconnect");
        WebApp.HapticFeedback.notificationOccurred("success");
      } else {
        const dns = new DNSApi(
          new Configuration({
            headers: {
              // To get unlimited requests
              Authorization: `Bearer ${import.meta.env.VITE_TONAPI_KEY}`,
            },
          })
        );

        const nft = new NFTApi(
          new Configuration({
            headers: {
              // To get unlimited requests
              Authorization: `Bearer ${import.meta.env.VITE_TONAPI_KEY}`,
            },
          })
        );

        const [{ domains }, { nftItems }] = await Promise.all([
          dns.dnsBackResolve({
            account: toUserFriendlyAddress(wallet.account.address),
          }),
          nft.getNftItemsByOwnerAddress({
            account: toUserFriendlyAddress(wallet.account.address),
          }),
        ]);

        store.dispatch("profile/wallet/update", {
          wallet,
          dns: domains[0] ?? null,
          avatar:
            nftItems.filter((a) => a.metadata.attributes && a.metadata.image)[0]
              .metadata.image ?? null,
        });
      }
    },
    (err) => {
      console.log("error", err.message);
      console.log(err.name);
    }
  );

  store.on("@init", () => ({ ...initState }));

  store.on("profile/wallet/update", (state, { wallet, dns, avatar }) => ({
    ...state,
    profile: {
      ...state.profile,
      wallet,
      addressWallet: wallet
        ? toUserFriendlyAddress(wallet.account.address)
        : null,
      dns,
      avatar,
      isFinish: true,
      isLoading: false,
      connect: {
        isLoading: false,
        data: null,
      },
    },
  }));

  store.on("profile/disconnect", async (state) => {
    await connector.disconnect();

    store.dispatch("#profile/disconnect");
  });

  store.on("#profile/disconnect", (state) => {
    return {
      ...state,
      profile: {
        ...initState.profile,
      },
    };
  });

  store.on("#profile/wallets/req", (state) => ({
    ...state,
    profile: {
      ...state.profile,
      wallets: {
        isLoading: true,
        data: [],
      },
    },
  }));

  store.on("#profile/wallets/res", (state, { wallets }) => ({
    ...state,
    profile: {
      ...state.profile,
      wallets: {
        isLoading: false,
        data: wallets,
      },
    },
  }));

  store.on("profile/wallets/get", async () => {
    store.dispatch("#profile/wallets/req");
    const wallets = await connector.getWallets();
    store.dispatch("#profile/wallets/res", { wallets });
  });

  store.on("#profile/preconnect/req", (state) => ({
    ...state,
    profile: {
      ...state.profile,
      connect: {
        isLoading: true,
        data: null,
      },
    },
  }));

  store.on("#profile/preconnect/res", (state, { url }) => ({
    ...state,
    profile: {
      ...state.profile,
      connect: {
        isLoading: false,
        data: url,
      },
    },
  }));

  store.on("profile/preconnect", async (state, { wallet }) => {
    store.dispatch("#profile/preconnect/req");

    const url = connector.connect({
      universalLink: (wallet as WalletInfoRemote).universalLink,
      bridgeUrl: (wallet as WalletInfoRemote).bridgeUrl,
    });

    store.dispatch("#profile/preconnect/res", { url });
  });
};
