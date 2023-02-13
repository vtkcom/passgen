import { Button } from "./@ui";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isToncoin?: boolean;
}

const Component: React.FC<Props> = ({ children, onClick, isToncoin }) => {
  return (
    <Button onClick={onClick} className={isToncoin ? " toncoin" : ""}>
      {children}
    </Button>
  );
};

Component.displayName = "Button";

export default Component;
