import { toUserFriendlyAddress } from "@tonconnect/sdk";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Button from "../../components/button";
import Icon from "../../components/icon";
import Sprites from "../../components/sprites";
import { useDetect } from "../../hooks/detect";
import useSystemTheme from "../../hooks/systemtheme";
import { Event, State } from "../../store";
import darkIcon from "../../assets/icons/dark.svg";
import lightIcon from "../../assets/icons/light.svg";
import style from "./index.module.css";

const Component: React.FC = () => {
  const location = useLocation();
  const { twa } = useDetect();
  const { profile, dispatch } = useStoreon<State, Event>("profile");
  const theme = useSystemTheme();

  useEffect(init, []);
  useEffect(toggleBackButton, [location]);
  useEffect(initTheme, [theme]);

  function initTheme(t = theme) {
    const icon =
      // @ts-ignore
      document.querySelector<"link">("link[rel='icon']") ??
      document.createElement("link");
    const colorScheme = document.createElement("meta");
    const themeColor = document.createElement("meta");

    icon.rel = "icon";
    icon.type = "image/svg+xml";
    icon.href = t === "dark" ? darkIcon : lightIcon;

    colorScheme.name = "color-scheme";
    colorScheme.content = t;

    themeColor.name = "theme-color";
    themeColor.content = t === "dark" ? "#000000" : "#FFFFFF";

    document.title = t === "dark" ? "👊🤘🤙" : "👊🏿🤘🏿🤙🏿";

    document.head.appendChild(icon);
    document.head.appendChild(colorScheme);
    document.head.appendChild(themeColor);

    return () => {
      document.head.removeChild(icon);
      document.head.removeChild(colorScheme);
      document.head.removeChild(themeColor);
    };
  }

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

  function buttonConnect() {
    WebApp.openLink(profile.connect.data!);
  }

  return (
    <>
      <main className={style.main}>
        <Outlet />
      </main>

      {profile.wallet === null && location.pathname !== "/connect" && (
        <div className={style.profile}>
          <Link to="/connect" state={{ openEndpoint: location.pathname }}>
            <Button isToncoin>Connect wallet</Button>
          </Link>
        </div>
      )}
      {profile.wallet === null && location.pathname === "/connect" && (
        <div className={style.profile}>
          <Button isToncoin onClick={buttonConnect}>
            Connect to Tonkeeper
          </Button>
        </div>
      )}
      {profile.wallet && (
        <div className={style.profile}>
          <Button onClick={() => dispatch("profile/disconnect")}>
            <span>{toUserFriendlyAddress(profile.wallet.account.address)}</span>
            <Icon name="PowerOff" size={1.5} />
          </Button>
        </div>
      )}

      <footer className={style.footer}>
        <span>
          <Icon name="LogoTON" size={1.5} />
          <strong>TON</strong>
        </span>
        <span>
          <div>&copy;</div>
          <div>{new Date().getFullYear()},</div>
          <div>notguiltyman.ton</div>
        </span>
      </footer>

      <Sprites />
    </>
  );
};

Component.displayName = "Layout";

export default Component;
