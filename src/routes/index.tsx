import { useTonConnect } from "../hooks/tonconnect";
import { useTonWallet } from "../hooks/tonwallet";

const Component: React.FC = () => {
  const wallet = useTonWallet();
  const { connect, wallets, walletsEmbedded } = useTonConnect();

  console.log(wallets, walletsEmbedded);

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
      address: <b>{wallet?.account.address}</b>
    </>
  );
};

export default Component;
