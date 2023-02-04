import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";
import Button from "../../components/button";
import Qr from "../../components/qr";
import { Event, State } from "../../store";
import style from "./index.module.css";

const Component: React.FC = () => {
  const { profile, dispatch } = useStoreon<State, Event>("profile");

  useEffect(() => {
    if (
      profile.wallet === null &&
      !profile.connect.isLoading &&
      profile.connect.data === null &&
      profile.wallets.data.length
    ) {
      console.log("pre", profile.wallets.data);

      dispatch("profile/preconnect", { wallet: profile.wallets.data[0] });
    }
  }, [profile.wallets, profile.wallet]);

  function buttonConnect() {
    WebApp.openLink(profile.connect.data!);
  }

  return (
    <div className={style.connect}>
      {profile.wallet === null && profile.connect.data !== "" && (
        <>
          <Qr url={profile.connect.data!} />
          <Button isToncoin onClick={buttonConnect}>
            Connect to Tonkeeper
          </Button>
        </>
      )}
    </div>
  );
};

export default Component;
