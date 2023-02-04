import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Qr from "../../components/qr";
import { useTonConnect } from "../../hooks/tonconnect";
import style from "./index.module.css";

const Component: React.FC = () => {
  const { connect, wallets } = useTonConnect();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (wallets.length) {
      const link = connect(wallets[0]);
      setUrl(link!);
    }
  }, [wallets]);

  function buttonConnect() {
    WebApp.openLink(url);
  }

  return (
    <div className={style.connect}>
      <Qr url={url} />
      <Button isToncoin onClick={buttonConnect}>
        Connect to Tonkeeper
      </Button>
    </div>
  );
};

export default Component;
