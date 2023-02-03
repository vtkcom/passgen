import { useTonConnect } from "../hooks/tonconnect";
import { useTonWallet } from "../hooks/tonwallet";

const Component: React.FC = () => {
  const wallet = useTonWallet();
  const { connect, wallets } = useTonConnect();

  console.log(wallets);

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
