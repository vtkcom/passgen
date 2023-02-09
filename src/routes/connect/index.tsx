import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Wallet from "./wallet";
import Title from "../../components/title";
import Wrap from "../../components/wrap";
import { Event, State } from "../../store";
import style from "./index.module.css";
import { WalletInfoInjected } from "@tonconnect/sdk";
import Icon from "../../components/icon";
import { IconName } from "../../components/sprites";
import Button from "../../components/button";

const Component: React.FC = () => {
  const {
    connect: { wallet, wallets },
    dispatch,
  } = useStoreon<State, Event>("profile", "connect");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(getWallets, []);
  useEffect(afterConnect, [wallet]);

  function getWallets() {
    dispatch("connect/wallets");
  }

  function afterConnect() {
    if (wallet)
      navigate(location.state?.openEndpoint ?? "/", { replace: true });
  }

  return (
    <Wrap style={{ gridTemplateRows: "max-content auto" }}>
      <Title>Connect to wallet</Title>
      <div className={style.content}>
        {wallets.data
          // .filter((a) => (a as WalletInfoInjected).injected)
          .map((a) => (
            <div
              key={a.name}
              onClick={() => dispatch("connect/on", { wallet: a })}
              className={style.wallet}
            >
              <Icon name={a.name as IconName} size={3} />
              <div className={style.information}>
                {a.name}
                <span>
                  <Icon name="AlertCircle" size={1} />
                  Information text
                </span>
              </div>
            </div>
          ))}
      </div>
    </Wrap>
  );
};

export default Component;
