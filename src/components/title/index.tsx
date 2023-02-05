import { memo } from "react";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

const Component: React.FC<Props> = ({ children }) => {
  return <h2>{children}</h2>;
};

Component.displayName = "Title";

export default memo(Component);
