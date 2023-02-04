import "@twa-dev/sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  HashRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import TonConnectProvider from "./components/tonconnectprovider";
import "./index.css";
import Layout from "./routes/layout";
import Home from "./routes/home";
import About from "./routes/about";
import Connect from "./routes/connect";

ReactDOM.createRoot(document.querySelector("app") as HTMLElement).render(
  <React.StrictMode>
    <TonConnectProvider manifestUrl="https://vtkcom.github.io/passgen/tonconnect-manifest.json">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="connect" element={<Connect />} />
          </Route>
        </Routes>
      </HashRouter>
    </TonConnectProvider>
  </React.StrictMode>
);
