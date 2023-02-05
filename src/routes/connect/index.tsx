import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Button from "../../components/button";
import Qr from "../../components/qr";
import Title from "../../components/title";
import Wrap from "../../components/wrap";
import { Event, State } from "../../store";
import style from "./index.module.css";

const Component: React.FC = () => {
  const { profile, dispatch } = useStoreon<State, Event>("profile");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(preConnect, [profile.wallets, profile.wallet]);
  useEffect(afterConnect, [profile.wallet]);

  function preConnect() {
    const isNotConnect = profile.wallet === null;
    const isNotLoadingConnect = !profile.connect.isLoading;
    const isEmptyConnectURL = profile.connect.data === null;
    const isNotEmptyWallets = profile.wallets.data.length;
    const isNeedNewURL =
      isNotConnect &&
      isNotLoadingConnect &&
      // isEmptyConnectURL &&
      isNotEmptyWallets;

    if (isNeedNewURL) {
      dispatch("profile/preconnect", { wallet: profile.wallets.data[0] });
    }
  }

  function buttonConnect() {
    WebApp.openLink(profile.connect.data!);
  }

  function afterConnect() {
    if (profile.wallet)
      navigate(location.state?.openEndpoint ?? "/", { replace: true });
  }

  return (
    <Wrap style={{ gridTemplateRows: "max-content auto" }}>
      <Title>Connect to Tonkeeper</Title>
      {profile.wallet === null && (
        <div className={style.connect}>
          <Qr url={profile.connect.data!} />
          <Button isToncoin onClick={buttonConnect}>
            Connect to Tonkeeper
          </Button>
        </div>
      )}
    </Wrap>
  );
};

export default Component;
