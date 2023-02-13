import { Button } from "./@ui";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  bgStyle?: "toncoin" | "settings" | "accounts";
  style?: "primary" | "ghost";
}

const Component: React.FC<Props> = ({ children, onClick, bgStyle, style = "primary" }) => {
  return (
    <Button
      onClick={onClick}
      className={[bgStyle && bgStyle, style].filter(Boolean).join(" ")}
    >
      {children}
    </Button>
  );
};

Component.displayName = "Button";

export default Component;
