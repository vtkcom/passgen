import type { IconName } from "../sprites";
import style from "./index.module.css";

interface Props {
  size?: number;
  name: IconName;
}

const Component: React.FC<Props> = ({ name, size = 2 }) => {
  return (
    <svg
      style={{ width: `${size}rem`, height: `${size}rem` }}
      stroke="#000"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className={style.icon}
    >
      <use href={`#svg-${name}`} />
    </svg>
  );
};

export default Component;
