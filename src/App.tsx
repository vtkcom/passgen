import { useState } from "react";
import { TonConnectUIProvider, TonConnectButton } from "@tonconnect/ui-react";
import Button from "./components/button";
import Wrap from "./components/wrap";
import Routes from "./routes";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <TonConnectUIProvider manifestUrl="https://vtkcom.github.io/pass-app/tonconnect-manifest.json">
      <Wrap>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <TonConnectButton />
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Routes />
      </Wrap>
    </TonConnectUIProvider>
  );
}

export default App;
