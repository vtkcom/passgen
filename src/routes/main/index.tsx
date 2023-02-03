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
    console.log(openEndpoint);
    console.log(location.pathname);

    if (openEndpoint === location.pathname) {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
    }
  }

  return <Outlet />;
};

export default Component;
