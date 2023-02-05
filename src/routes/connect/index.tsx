import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Qr from "../../components/qr";
import Title from "../../components/title";
import Wrap from "../../components/wrap";
import { Event, State } from "../../store";
import style from "./index.module.css";

const Component: React.FC = () => {
  const {
    profile: { wallet, wallets, connect },
    dispatch,
  } = useStoreon<State, Event>("profile");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(preConnect, [wallets]);
  useEffect(afterConnect, [wallet]);

  function preConnect() {
    const isNotConnect = wallet === null;
    const isNotLoadingConnect = !connect.isLoading;
    const isEmptyConnectURL = connect.data === null;
    const isNotEmptyWallets = wallets.data.length;
    const isNeedNewURL =
      isNotConnect &&
      isNotLoadingConnect &&
      isEmptyConnectURL &&
      isNotEmptyWallets;

    if (isNeedNewURL) {
      dispatch("profile/preconnect", { wallet: wallets.data[0] });
    }
  }

  function afterConnect() {
    if (wallet)
      navigate(location.state?.openEndpoint ?? "/", { replace: true });
  }

  return (
    <Wrap style={{ gridTemplateRows: "max-content auto" }}>
      <Title>Connect to Tonkeeper</Title>
      {connect.data !== null && connect.data !== "" && (
        <div className={style.connect}>
          <Qr url={connect.data} />
          <p>
            Corporis asperiores est ut perspiciatis. Distinctio provident
            cupiditate doloribus error sunt aspernatur dolores. Fugiat sapiente
            explicabo repellat repellat ut. Corrupti qui quia qui cumque alias
            est accusamus. Voluptas magni natus debitis repellat aut tenetur.
            Rerum et aut aut qui omnis iure autem.
          </p>
        </div>
      )}
    </Wrap>
  );
};

export default Component;
