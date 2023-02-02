import {
  useTonWallet,
  useTonConnectUI,
  useIsConnectionRestored,
} from "@tonconnect/ui-react";

const Component: React.FC = () => {
  const wallet = useTonWallet();
  const restored = useIsConnectionRestored();
  const [con, setCon] = useTonConnectUI();

  console.log(restored);
  console.log(con);
  console.log(wallet);
  
//   con.connectWallet();

  return wallet?.account.address.toString() ? (
    <div>{wallet?.account.address.toString()}</div>
  ) : null;
};

export default Component;
