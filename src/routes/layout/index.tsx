import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "../../components/button";
import { useDetect } from "../../hooks/detect";
import style from "./index.module.css";

const Component: React.FC = () => {
  const location = useLocation();
  const { twa, platform, agent } = useDetect();

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
        {location.pathname !== "/connect" && (
          <Link to="/connect">
            <Button isToncoin>Connect wallet</Button>
          </Link>
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
    </>
  );
};

export default Component;
