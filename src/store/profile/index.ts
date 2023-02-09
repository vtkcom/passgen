import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { StoreonModule } from "storeon";
import { DNSApi, NFTApi, Configuration } from "tonapi-sdk-js";

interface Metadata {
  name: string;
  description: string;
  attributes: Attribute[];
  image: string;
  marketplace?: "getgems.io";
  external_url?: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

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
    avatar: { url: string; external_url: string } | null;
  };
}

export interface Event {
  "profile/update": { wallet: string };
  "#profile/req": undefined;
  "#profile/res": {
    dns: string | null;
    avatar: { url: string; external_url: string } | null;
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
      nft.searchNFTItems({
        includeOnSale: true,
        owner: wallet,
        limit: 1000,
        offset: 0,
      }),
    ]);

    const avatar = nftItems.find(
      (a) => (a.metadata as Metadata)?.marketplace === "getgems.io"
    );

    store.dispatch("#profile/res", {
      dns: domains ? domains[0] ?? null : null,
      avatar: avatar
        ? {
            external_url: `https://tonapi.io/account/${toUserFriendlyAddress(
              avatar.address
            )}`,
            url: avatar.previews!.find((a) => a.resolution === "100x100")!.url,
          }
        : null,
    });
  });
};
