import style from "./index.module.css";

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Component: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div {...props} className={style.wrap}>
      {children}
    </div>
  );
};

Component.displayName = "Wrapper"

export default Component;
