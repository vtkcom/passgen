import { StoreonModule } from "storeon";
import { DNSApi, NFTApi, Configuration } from "tonapi-sdk-js";

const dns = new DNSApi(
  new Configuration({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TONAPI_KEY}`,
    },
  })
);

const nft = new NFTApi(
  new Configuration({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TONAPI_KEY}`,
    },
  })
);

export interface State {
  profile: {
    isLoading: boolean;
    dns: string | null;
    avatar: string | null;
  };
}

export interface Event {
  "profile/update": { wallet: string };
  "#profile/req": undefined;
  "#profile/res": {
    dns: string | null;
    avatar: string | null;
  };
}

const initState: State = {
  profile: {
    isLoading: true,
    dns: null,
    avatar: null,
  },
};

export const profile: StoreonModule<State, Event> = (store) => {
  store.on("@init", () => ({ ...initState }));

  store.on("#profile/req", (state) => ({
    profile: { ...state.profile, isLoading: true, dns: null, avatar: null },
  }));

  store.on("#profile/res", (state, { dns, avatar }) => ({
    profile: { ...state.profile, isLoading: false, dns, avatar },
  }));

  store.on("profile/update", async (state, { wallet }) => {
    store.dispatch("#profile/req");
    const [{ domains }, { nftItems }] = await Promise.all([
      dns.dnsBackResolve({
        account: wallet,
      }),
      nft.getNftItemsByOwnerAddress({
        account: wallet,
      }),
    ]);
    store.dispatch("#profile/res", {
      dns: domains ? domains[0] ?? null : null,
      avatar:
        nftItems.filter((a) => a.metadata.attributes && a.metadata.image)[0]
          .metadata.image ?? null,
    });
  });
};
