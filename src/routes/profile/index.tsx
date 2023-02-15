import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Content } from "./@ui";
import Radio from "../../components/radio";
import Wrap from "../../components/wrap";
import { useTranslator } from "../../hooks/translator";

const Component: React.FC = () => {
  const t = useTranslator();
  const data = useMemo(
    () => [
      {
        url: "/profile/generate",
        label: t("profile.generate"),
        key: "generate",
      },
      {
        url: "/profile/accounts",
        label: t("profile.accounts"),
        key: "accounts",
      },
      {
        url: "/profile/settings",
        label: t("profile.settings"),
        key: "settings",
      },
    ],
    []
  );

  return (
    <Content>
      <Radio data={data} />

      <Wrap>
        <Outlet />
      </Wrap>
    </Content>
  );
};

export default Component;
