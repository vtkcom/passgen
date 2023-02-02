import style from "./index.module.css";

interface Props {
  children?: React.ReactNode[];
}

const Component: React.FC<Props> = ({ children }) => {
  return <div className={style.wrap}>{children}</div>;
};

export default Component;
