import { useEffect, useMemo, memo } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Qr from "../../../components/qr";
import Title from "../../../components/title";
import Wrap from "../../../components/wrap";
import { Event, State } from "../../../store";
import { Connect } from "./@ui";

const Component: React.FC = () => {
  const {
    connect: { wallet, wallets, url },
    dispatch,
  } = useStoreon<State, Event>("profile", "connect");
  const [{ params }] = useMatches();
  const navigate = useNavigate();
  const wal = useMemo(
    () =>
      wallets.data.find((a) => a.name.toLowerCase() === params.wallet) ?? null,
    [wallets, params]
  );

  useEffect(getWallets, []);
  useEffect(afterConnect, [wallet]);

  function getWallets() {
    dispatch("connect/wallets");
  }

  function afterConnect() {
    if (wallet) navigate("/", { replace: true });
  }

  return (
    <Wrap style={{ gridTemplateRows: "max-content auto" }}>
      <Title>Connect to {wal?.name}</Title>
      {url !== null && (
        <Connect>
          <Qr url={url} />
          <p>
            Corporis asperiores est ut perspiciatis. Distinctio provident
            cupiditate doloribus error sunt aspernatur dolores. Fugiat sapiente
            explicabo repellat repellat ut. Corrupti qui quia qui cumque alias
            est accusamus. Voluptas magni natus debitis repellat aut tenetur.
            Rerum et aut aut qui omnis iure autem.
          </p>
        </Connect>
      )}
    </Wrap>
  );
};

export default memo(Component);
