import TonConnect, {
  type Wallet,
  type WalletInfo,
  toUserFriendlyAddress,
  WalletInfoRemote,
  WalletInfoInjected,
} from "@tonconnect/sdk";
import WebApp from "@twa-dev/sdk";
import { StoreonModule } from "storeon";

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
  "profile/wallet/update": { wallet: Wallet | null };
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
    (wallet) => {
      if (wallet === null) {
        store.dispatch("#profile/disconnect");
        WebApp.HapticFeedback.notificationOccurred("success");
      } else {
        store.dispatch("profile/wallet/update", { wallet });
      }
    },
    (err) => {
      console.log("error", err.message);
      console.log(err.name);
    }
  );
  store.on("@init", () => ({ ...initState }));

  //   store.dispatch("profile/wallets/get");

  store.on("profile/wallet/update", (state, { wallet }) => ({
    ...state,
    profile: {
      ...state.profile,
      wallet,
      addressWallet: wallet
        ? toUserFriendlyAddress(wallet.account.address)
        : null,
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
  });

  store.on("#profile/disconnect", (state) => {
    return {
      ...state,
      profile: {
        ...state.profile,
        wallet: null,
        addressWallet: null,
        isFinish: false,
        isLoading: false,
        connect: {
          isLoading: false,
          data: null,
        },
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
