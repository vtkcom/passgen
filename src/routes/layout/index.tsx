import { toUserFriendlyAddress } from "@tonconnect/sdk";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Button from "../../components/button";
import Icon from "../../components/icon";
import Sprites from "../../components/sprites";
import { useDetect } from "../../hooks/detect";
import { Event, State } from "../../store";
import style from "./index.module.css";

const Component: React.FC = () => {
  const location = useLocation();
  const { twa } = useDetect();
  const { profile, dispatch } = useStoreon<State, Event>("profile");

  useEffect(init, []);
  useEffect(toggleBackButton, [location]);

  function init() {
    dispatch("profile/wallets/get");
    if (twa) {
      WebApp.ready();

      localStorage.setItem("openendpoint", location.hash);

      function back() {
        history.back();
      }

      WebApp.BackButton.onClick(back);

      return () => WebApp.BackButton.offClick(back);
    }
  }

  function toggleBackButton() {
    if (twa) {
      const openEndpoint = localStorage.getItem("openendpoint");
      WebApp.HapticFeedback.impactOccurred("light");

      openEndpoint === location.hash
        ? WebApp.BackButton.hide()
        : WebApp.BackButton.show();
    }
  }

  return (
    <>
      <main className={style.main}>
        <Outlet />
      </main>

      <div className={style.profile}>
        {!profile.wallets.isLoading &&
          profile.wallet === null &&
          location.pathname !== "/connect" && (
            <Link to="/connect">
              <Button isToncoin>Connect wallet</Button>
            </Link>
          )}
        {profile.wallet && (
          <Button onClick={() => dispatch("profile/disconnect")}>
            <span>{toUserFriendlyAddress(profile.wallet.account.address)}</span>
            <Icon name="PowerOff" size={1.5} />
          </Button>
        )}
      </div>

      <footer className={style.footer}>
        <span>&copy;</span>
        <span>{new Date().getFullYear()}</span>
        <span>notguiltyman.ton</span>
      </footer>

      <Sprites />
    </>
  );
};

Component.displayName = "Layout";

export default Component;
