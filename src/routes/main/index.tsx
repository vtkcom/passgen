import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Component: React.FC = () => {
  const location = useLocation();

  useEffect(init, []);
  useEffect(toggleBackButton, [location]);

  function init() {
    localStorage.setItem("openendpoint", location.pathname);

    function back() {
      history.back();
    }

    WebApp.BackButton.onClick(back);

    return () => WebApp.BackButton.offClick(back);
  }

  function toggleBackButton() {
    const openEndpoint = localStorage.getItem("openendpoint");

    if (openEndpoint === location.pathname) {
      WebApp.BackButton.hide();
    }
    {
      WebApp.BackButton.show();
    }
  }

  return <Outlet />;
};

export default Component;
