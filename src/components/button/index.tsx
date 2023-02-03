import style from "./index.module.css";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Component: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={style.button}>
      {children}
    </div>
  );
};

export default Component;
