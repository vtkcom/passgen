import { Wrap } from "./@ui";

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Component: React.FC<Props> = ({ children, ...props }) => {
  // @ts-ignore
  return <Wrap {...props}>{children}</Wrap>;
};

Component.displayName = "Wrapper";

export default Component;
