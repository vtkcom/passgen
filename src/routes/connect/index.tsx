import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { WalletInfoInjected, WalletInfoRemote } from "@tonconnect/sdk";
import { Content, Wallet } from "./@ui";
import Title from "../../components/title";
import Wrap from "../../components/wrap";
import Icon from "../../components/icon";
import { IconName } from "../../components/sprites";
import { useTranslator } from "../../hooks/translator";
import { useDetect } from "../../hooks/detect";
import { Event, State } from "../../store";

interface Props {
  data: string[];
}

const Information: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map((a, i) => (
        <div key={i.toString()}>
          <span>{i + 1}</span>
          {a}
        </div>
      ))}
    </>
  );
};

const Component: React.FC = () => {
  const {
    connect: { wallet, wallets },
    dispatch,
  } = useStoreon<State, Event>("profile", "connect");
  const navigate = useNavigate();
  const t = useTranslator();
  const { mobile } = useDetect();

  useEffect(getWallets, []);
  useEffect(afterConnect, [wallet]);

  function getWallets() {
    dispatch("connect/wallets");
  }

  function afterConnect() {
    if (wallet) navigate("/", { replace: true });
  }

  return (
    <Wrap style={{ gridTemplateRows: "max-content max-content auto" }}>
      <Title>{t("connect.title")}</Title>
      <p>{t("connect.information")}</p>
      <Content>
        {wallets.data
          .filter((a) => (a as WalletInfoRemote).universalLink)
          .map((a) => (
            <Wallet
              key={a.name}
              onClick={() => {
                dispatch("connect/on/see", { wallet: a, isOpen: mobile });
                !mobile &&
                  navigate(`/connect/${a.name.toLowerCase()}`, {
                    replace: true,
                  });
              }}
            >
              <Icon name={a.name as IconName} size={4} />
              <div className="information">
                {a.name}
                <Information
                  data={
                    [
                      t("connect.tap"),
                      !mobile && t("connect.scan"),
                      t("connect.aproove.mobile"),
                    ].filter(Boolean) as string[]
                  }
                />
              </div>
            </Wallet>
          ))}
        {wallets.data
          .filter((a) => (a as WalletInfoInjected).injected)
          .map((a) => (
            <Wallet
              key={a.name}
              onClick={() => dispatch("connect/on/js", { wallet: a })}
            >
              <Icon name={a.name as IconName} size={4} />
              <div className="information">
                {a.name}
                <Information
                  data={[t("connect.tap"), t("connect.aproove.extension")]}
                />
              </div>
            </Wallet>
          ))}
        {wallets.data
          .filter((a) => (a as WalletInfoInjected).embedded)
          .map((a) => (
            <Wallet
              key={a.name}
              onClick={() => dispatch("connect/on/js", { wallet: a })}
            >
              <Icon name={a.name as IconName} size={4} />
              <div className="information">
                {a.name}
                <Information
                  data={[t("connect.tap"), t("connect.aproove.mobile")]}
                />
              </div>
            </Wallet>
          ))}
      </Content>
    </Wrap>
  );
};

export default Component;
