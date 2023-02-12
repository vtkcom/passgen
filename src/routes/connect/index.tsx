import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Title from "../../components/title";
import Wrap from "../../components/wrap";
import { Event, State } from "../../store";
import style from "./index.module.css";
import { WalletInfoInjected, WalletInfoRemote } from "@tonconnect/sdk";
import Icon from "../../components/icon";
import { IconName } from "../../components/sprites";
import useMobileCheck from "../../hooks/mobilecheck";
import { useTranslator } from "../../hooks/translator";

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
  const t = useTranslator()
  const isMobile = useMobileCheck();

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
      <p>
        {t("connect.information")}
      </p>
      <div className={style.content}>
        {wallets.data
          .filter((a) => (a as WalletInfoRemote).universalLink)
          .map((a) => (
            <div
              key={a.name}
              onClick={() => {
                dispatch("connect/on/see", { wallet: a, isOpen: isMobile });
                !isMobile &&
                  navigate(`/connect/${a.name.toLowerCase()}`, {
                    replace: true,
                  });
              }}
              className={style.wallet}
            >
              <Icon name={a.name as IconName} size={4} />
              <div className={style.information}>
                {a.name}
                <Information
                  data={
                    [
                      t("connect.tap"),
                      !isMobile && t("connect.scan"),
                      t("connect.aproove.mobile"),
                    ].filter(Boolean) as string[]
                  }
                />
              </div>
            </div>
          ))}
        {wallets.data
          .filter((a) => (a as WalletInfoInjected).injected)
          .map((a) => (
            <div
              key={a.name}
              onClick={() => dispatch("connect/on/js", { wallet: a })}
              className={style.wallet}
            >
              <Icon name={a.name as IconName} size={4} />
              <div className={style.information}>
                {a.name}
                <Information
                  data={[
                    t("connect.tap"),
                    t("connect.aproove.extension"),
                  ]}
                />
              </div>
            </div>
          ))}
        {wallets.data
          .filter((a) => (a as WalletInfoInjected).embedded)
          .map((a) => (
            <div
              key={a.name}
              onClick={() => dispatch("connect/on/js", { wallet: a })}
              className={style.wallet}
            >
              <Icon name={a.name as IconName} size={4} />
              <div className={style.information}>
                {a.name}
                <Information
                  data={[
                    t("connect.tap"),
                    t("connect.aproove.mobile"),
                  ]}
                />
              </div>
            </div>
          ))}
      </div>
    </Wrap>
  );
};

export default Component;
