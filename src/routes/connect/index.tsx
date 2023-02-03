import Button from "../../components/button";
import Qr from "../../components/qr";
import style from "./index.module.css";

const Component: React.FC = () => {
  return (
    <div className={style.connect}>
      <Qr url="https://fragment.com/59ed5647-4096-4888-9556-261a2e4b4930" />
      <Button isToncoin>Connect to Tonkeeper</Button>
    </div>
  );
};

export default Component;
