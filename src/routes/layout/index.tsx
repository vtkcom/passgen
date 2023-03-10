import { useEffect, useRef } from "react";
import {
  Content,
  Footer,
  GlobalStyle,
  Information,
  Main,
  Profile,
  Wallet,
} from "./@ui";
import WebApp from "@twa-dev/sdk";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { ThemeProvider } from "styled-components";
import Button from "../../components/button";
import Icon from "../../components/icon";
import Sprites from "../../components/sprites";
import Avatar from "../../components/avatar";
import { useDetect } from "../../hooks/detect";
import { useSystemTheme } from "../../hooks/systemtheme";
import { useTranslator } from "../../hooks/translator";
import { maskifyAddress } from "../../utils/maskifyaddress";
import { Event, State } from "../../store";
import { theme } from "../../theme";
import darkIcon from "../../assets/icons/dark.svg";
import lightIcon from "../../assets/icons/light.svg";

const Component: React.FC = () => {
  const location = useLocation();
  const { twa } = useDetect();
  const t = useTranslator();
  const { profile, connect, dispatch } = useStoreon<State, Event>(
    "profile",
    "connect"
  );
  const systemTheme = useSystemTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(init, []);
  useEffect(getProfile, [connect.wallet]);
  useEffect(observeSticky, [ref.current]);
  useEffect(toggleBackButton, [location]);
  useEffect(initTheme, [systemTheme]);

  function initTheme() {
    const icon =
      // @ts-ignore
      document.querySelector<"link">("link[rel='icon']") ??
      document.createElement("link");
    const colorScheme = document.createElement("meta");
    const themeColor = document.createElement("meta");

    icon.rel = "icon";
    icon.type = "image/svg+xml";
    icon.href = systemTheme === "dark" ? darkIcon : lightIcon;

    colorScheme.name = "color-scheme";
    colorScheme.content = systemTheme;

    themeColor.name = "theme-color";
    themeColor.content =
      systemTheme === "dark"
        ? WebApp.themeParams.bg_color ?? "#000"
        : WebApp.themeParams.bg_color ?? "#fff";

    document.title = systemTheme === "dark" ? "????????????" : "????????????????????????";

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
    WebApp.HapticFeedback.impactOccurred("light");
    if (twa && false) {
      const openEndpoint = localStorage.getItem("openendpoint");

      openEndpoint === location.pathname
        ? WebApp.BackButton.hide()
        : WebApp.BackButton.show();
    }
  }

  function observeSticky() {
    if (ref.current) {
      const el = ref.current;

      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle("sticky", e.intersectionRatio < 1),
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
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Main>
        <Outlet />
      </Main>

      <Content className={WebApp.platform} ref={ref}>
        {connect.wallet === null &&
          !new RegExp("connect").test(location.pathname) && (
            <Link to="/connect" state={{ openEndpoint: location.pathname }}>
              <Button bgStyle="toncoin">{t("button.connect")}</Button>
            </Link>
          )}
        {connect.wallet && (
          <Profile>
            <Wallet>
              <Avatar
                onClick={() => openLink(profile.avatar?.external_url ?? "")}
                src={
                  profile.avatar?.url ??
                  `https://source.boringavatars.com/marble/200/${connect.wallet}`
                }
              />
              <Information
                onClick={() =>
                  openLink(`https://tonapi.io/account/${connect.wallet}`)
                }
              >
                {!profile.isLoading && profile.dns !== null && (
                  <div className="dns">{profile.dns}.ton</div>
                )}
                <div>{maskifyAddress(connect.wallet, 15, 6)}</div>
              </Information>
            </Wallet>
            <Icon
              name="PowerOff"
              onClick={() => dispatch("connect/off")}
              style={{ cursor: "pointer" }}
            />
          </Profile>
        )}
      </Content>

      <Footer>
        <span>
          {t("footer.base")}
          <Icon name="LogoTON" size={1.5} />
          TON
        </span>
        <span>
          <div>&copy;</div>
          <div>{new Date().getFullYear()},</div>
          <div>notguiltyman.ton</div>
        </span>
      </Footer>

      <Sprites />
    </ThemeProvider>
  );
};

Component.displayName = "Layout";

export default Component;
