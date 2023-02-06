import style from "./index.module.css";

interface Props extends React.HTMLProps<HTMLImageElement> {}

const Component: React.FC<Props> = ({ ...props }) => {
  return <img {...props} className={style.avatar} />;
};

Component.displayName = "Avatar";

export default Component;
