import { Link } from "react-router-dom";
import Wrap from "../../components/wrap";

const Component: React.FC = () => {
  return (
    <Wrap>
      <b>Home</b>
      <br />
      <Link to="/about">About</Link>
    </Wrap>
  );
};

export default Component;
