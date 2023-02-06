import { memo } from "react";
import style from "./index.module.css";

export type IconName = "PowerOff" | "LogoTON";

const Component: React.FC = () => {
  return (
    <svg className={style.sprite} xmlns="http://www.w3.org/2000/svg">
      <symbol
        id="svg-PowerOff"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
      </symbol>
      <symbol id="svg-LogoTON" viewBox="0 0 40 40">
        <circle cx={20} cy={20} r={20} fill="#0088CC" />
        <path
          d="M14.9 12h10.2c.642 0 1.186 0 1.616.039.434.04.908.127 1.309.415.55.397.902 1.005.967 1.673.047.486-.118.931-.306 1.318-.186.383-.464.842-.792 1.384l-7.103 11.73A.923.923 0 0120 29a.923.923 0 01-.79-.442L12.105 16.83c-.328-.542-.606-1.001-.792-1.384-.188-.387-.353-.832-.306-1.318a2.342 2.342 0 01.967-1.673c.401-.288.875-.376 1.309-.415.43-.039.974-.039 1.615-.039zM20 12v17"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinejoin="round"
          fill="none"
        />
      </symbol>
    </svg>
  );
};

Component.displayName = "Sprites";

export default memo(Component);
