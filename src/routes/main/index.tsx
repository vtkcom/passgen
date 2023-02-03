import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDetect } from "../../hooks/detect";

const Component: React.FC = () => {
  const location = useLocation();
  const { twa, platform, appCodeName } = useDetect();

  useEffect(init, []);
  useEffect(toggleBackButton, [location]);

  function init() {
    WebApp.ready();

    localStorage.setItem("openendpoint", location.pathname);

    function back() {
      history.back();
    }

    WebApp.BackButton.onClick(back);

    return () => WebApp.BackButton.offClick(back);
  }

  function toggleBackButton() {
    const openEndpoint = localStorage.getItem("openendpoint");

    openEndpoint === location.pathname
      ? WebApp.BackButton.hide()
      : WebApp.BackButton.show();
  }

  return (
    <>
      {twa}
      <br />
      {platform}
      <br />
      {appCodeName}
      <br />
      <Outlet />
    </>
  );
};

export default Component;
