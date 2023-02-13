import Wrap from "../../components/wrap";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Wrap>
      <Navigate to="/profile" replace />
    </Wrap>
  );
}

export default App;
