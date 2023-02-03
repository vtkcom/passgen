import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { useTonConnect } from "../hooks/tonconnect";
import { useTonWallet } from "../hooks/tonwallet";

const Component: React.FC = () => {
  const wallet = useTonWallet();
  const { connect, wallets, walletsEmbedded } = useTonConnect();

  console.log(wallet, walletsEmbedded);

  //   con.connectWallet();

  return (
    <>
      {wallets.map((info) => {
        return (
          <img
            key={info.name}
            src={info.imageUrl}
            onClick={() => connect(info)}
          />
        );
      })}
      address:{" "}
      {wallet && <b>{toUserFriendlyAddress(wallet?.account.address)}</b>}
    </>
  );
};

export default Component;
