import { useEffect, useMemo } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Radio from "../../components/radio";
import Title from "../../components/title";
import Wrap from "../../components/wrap";
import { useTranslator } from "../../hooks/translator";

const Component: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const t = useTranslator();
  const data = useMemo(
    () => [
      { url: "/profile/accounts", label: t("profile.accounts"), key: "accounts" },
      { url: "/profile/settings", label: t("profile.settings"), key: "settings" },
    ],
    []
  );
  const title = useMemo(
    () => data.find((a) => a.url === location.pathname)?.label,
    [location, data]
  );

  useEffect(redirect, [location, data]);

  function redirect() {
    if (data.length && location.pathname === "/profile")
      navigate(data[0].url, { replace: true });
  }

  return (
    <Wrap>
      {/* <Title>{title}</Title> */}
      <Radio data={data} />

      <Outlet />

      {/* <Navigate to="/all/accounts" /> */}
    </Wrap>
  );
};

export default Component;
