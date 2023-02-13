import { memo } from "react";
import type { IconName } from "../sprites";

interface Props extends React.HTMLProps<SVGSVGElement> {
  size?: number;
  name: IconName;
}

const Component: React.FC<Props> = ({ name, size = 2, ...props }) => {
  return (
    <svg
      {...props}
      style={{ width: `${size}rem`, height: `${size}rem`, ...props.style }}
    >
      <use href={`#svg-${name}`} />
    </svg>
  );
};

Component.displayName = "Icon";

export default memo(Component);
