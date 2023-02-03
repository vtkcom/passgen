import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TonConnectProvider from "./components/tonconnectprovider";
import "./index.css";

ReactDOM.createRoot(document.querySelector("app") as HTMLElement).render(
  <React.StrictMode>
    <TonConnectProvider manifestUrl="https://vtkcom.github.io/passgen/tonconnect-manifest.json">
      <App />
    </TonConnectProvider>
  </React.StrictMode>
);
