import style from "./index.module.css";

interface Props extends React.HTMLProps<HTMLImageElement> {}

const Component: React.FC<Props> = ({ src, ...props }) => {
  return (
    <img
      src={src}
      {...props}
      loading="lazy"
      className={style.avatar + " " + props.className}
    />
  );
};

Component.displayName = "Avatar";

export default Component;
