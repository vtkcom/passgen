import { Link } from "react-router-dom";
import Title from "../../components/title";
import Wrap from "../../components/wrap";

const Component: React.FC = () => {
  return (
    <Wrap>
      <Title>Home</Title>
      <Link to="/about">About</Link>
      <p>
        Corporis asperiores est ut perspiciatis. Distinctio provident cupiditate
        doloribus error sunt aspernatur dolores. Fugiat sapiente explicabo
        repellat repellat ut. Corrupti qui quia qui cumque alias est accusamus.
        Voluptas magni natus debitis repellat aut tenetur. Rerum et aut aut qui
        omnis iure autem.
      </p>
    </Wrap>
  );
};

export default Component;
