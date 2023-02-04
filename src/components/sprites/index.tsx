import style from "./index.module.css";

export type IconName = "PowerOff";

const Component: React.FC = () => {
  return (
    <svg className={style.sprite} xmlns="http://www.w3.org/2000/svg">
      <symbol id="svg-PowerOff">
        <path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
      </symbol>
    </svg>
  );
};

export default Component;
