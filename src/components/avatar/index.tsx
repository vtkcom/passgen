import { Avatar } from "./@ui";

interface Props extends React.HTMLProps<HTMLImageElement> {}

const Component: React.FC<Props> = ({ src, ...props }) => {
  return (
    // @ts-ignore
    <Avatar src={src} {...props} loading="lazy" />
  );
};

Component.displayName = "Avatar";

export default Component;
