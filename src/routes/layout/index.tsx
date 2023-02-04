import { toUserFriendlyAddress } from "@tonconnect/sdk";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "../../components/button";
import Icon from "../../components/icon";
import Sprites from "../../components/sprites";
import { useDetect } from "../../hooks/detect";
import { useTonConnect } from "../../hooks/tonconnect";
import { useTonWallet } from "../../hooks/tonwallet";
import style from "./index.module.css";

const Component: React.FC = () => {
  const location = useLocation();
  const { twa } = useDetect();
  const wallet = useTonWallet();
  const { wallets, disconnect } = useTonConnect();

  // @todo: Записывать хэш
  // location.hash

  useEffect(init, []);
  useEffect(toggleBackButton, [location]);

  function init() {
    if (twa) {
      WebApp.ready();

      localStorage.setItem("openendpoint", location.pathname);

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

      openEndpoint === location.pathname
        ? WebApp.BackButton.hide()
        : WebApp.BackButton.show();
    }
  }

  return (
    <>
      <header className={style.header}>
        {wallet === null &&
          wallets.length > 0 &&
          location.pathname !== "/connect" && (
            <Link to="/connect">
              <Button isToncoin>Connect wallet</Button>
            </Link>
          )}
        {wallet && (
          <>
            <div>{toUserFriendlyAddress(wallet.account.address)}</div>
            <span onClick={disconnect}>
              <Icon name="PowerOff" />
            </span>
          </>
        )}
      </header>

      <main className={style.main}>
        <Outlet />
      </main>

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
