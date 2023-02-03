import { Link } from "react-router-dom";

const Component: React.FC = () => {
  return (
    <>
      <b>Home</b>
      <Link to="/about">About</Link>
    </>
  );
};

export default Component;
