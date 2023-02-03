import style from "./index.module.css";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isToncoin?: boolean;
}

const Component: React.FC<Props> = ({ children, onClick, isToncoin }) => {
  return (
    <div
      onClick={onClick}
      className={`${style.button}${isToncoin ? " " + style.toncoin : ""}`}
    >
      {children}
    </div>
  );
};

export default Component;
