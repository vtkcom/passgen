import WebApp from "@twa-dev/sdk";
import { useEffect, useRef } from "react";
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
import { maskifyAddress } from "../../utils/maskifyaddress";
import Avatar from "../../components/avatar";
import { useTranslator } from "../../hooks/translator";

const Component: React.FC = () => {
  const location = useLocation();
  const { twa } = useDetect();
  const t = useTranslator();
  const { profile, connect, dispatch } = useStoreon<State, Event>(
    "profile",
    "connect"
  );
  const theme = useSystemTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(init, []);
  useEffect(getProfile, [connect.wallet]);
  useEffect(observeSticky, [ref.current]);
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
    themeColor.content =
      t === "dark"
        ? WebApp.themeParams.bg_color ?? "#000"
        : WebApp.themeParams.bg_color ?? "#fff";

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

  function observeSticky() {
    if (ref.current) {
      const el = ref.current;

      const observer = new IntersectionObserver(
        ([e]) =>
          e.target.classList.toggle(style.sticky, e.intersectionRatio < 1),
        { threshold: [1] }
      );

      observer.observe(el);

      return () => observer.unobserve(el);
    }
  }

  function getProfile() {
    if (connect.wallet) dispatch("profile/update", { wallet: connect.wallet });
  }

  function openLink(url: string) {
    if (url) {
      WebApp.HapticFeedback.impactOccurred("light");
      WebApp.openLink(url);
    }
  }

  return (
    <>
      <main className={style.main}>
        <Outlet />
      </main>

      <div className={style.connect + " " + style[WebApp.platform]} ref={ref}>
        {connect.wallet === null &&
          !new RegExp("connect").test(location.pathname) && (
            <Link to="/connect" state={{ openEndpoint: location.pathname }}>
              <Button isToncoin>{t("button.connect")}</Button>
            </Link>
          )}
        {connect.wallet && (
          <div className={style.profile}>
            <span className={style.wallet}>
              <Avatar
                onClick={() => openLink(profile.avatar?.external_url ?? "")}
                src={
                  profile.avatar?.url ??
                  `https://source.boringavatars.com/marble/200/${connect.wallet}`
                }
              />
              <div
                className={style.information}
                onClick={() =>
                  openLink(`https://tonapi.io/account/${connect.wallet}`)
                }
              >
                {!profile.isLoading && profile.dns !== null && (
                  <div className={style.dns}>{profile.dns}.ton</div>
                )}
                <div>{maskifyAddress(connect.wallet)}</div>
              </div>
            </span>
            <Icon
              name="PowerOff"
              onClick={() => dispatch("connect/off")}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>

      <footer className={style.footer}>
        <span>
          <Icon name="LogoTON" size={1.5} />
          TON
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
