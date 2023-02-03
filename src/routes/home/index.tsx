import { Link } from "react-router-dom";
import Wrap from "../../components/wrap";

const Component: React.FC = () => {
  return (
    <Wrap>
      <b>Home</b>
      <Link to="/about">About</Link>
    </Wrap>
  );
};

export default Component;
