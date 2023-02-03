import "@twa-dev/sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import TonConnectProvider from "./components/tonconnectprovider";
import "./index.css";
import Main from "./routes/main";
import Home from "./routes/home";
import About from "./routes/about";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
  ),
  {
    basename: "/passgen",
  }
);

ReactDOM.createRoot(document.querySelector("app") as HTMLElement).render(
  <React.StrictMode>
    <TonConnectProvider manifestUrl="https://vtkcom.github.io/passgen/tonconnect-manifest.json">
      <RouterProvider router={router} />
    </TonConnectProvider>
  </React.StrictMode>
);
