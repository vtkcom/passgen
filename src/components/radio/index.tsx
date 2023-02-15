import { NavLink } from "react-router-dom";
import Button from "../button";
import { Radio } from "./@ui";

interface Props {
  data: { url: string; label: string, key: string }[];
}

const Component: React.FC<Props> = ({ data }) => {
  return (
    <Radio>
      {data.map((a) => (
        <NavLink key={a.key} to={a.url}>
          {({ isActive }) => (
            <Button
              style={isActive ? "primary" : "ghost"}
              bgStyle={isActive ? a.key as "toncoin" : undefined}
            >
              {a.label}
            </Button>
          )}
        </NavLink>
      ))}
    </Radio>
  );
};

Component.displayName = "Radio";

export default Component;
