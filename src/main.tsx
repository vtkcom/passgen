import "@twa-dev/sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  HashRouter,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import { StoreContext } from "storeon/react";
import Layout from "./routes/layout";
import Home from "./routes/home";
import About from "./routes/about";
import Connect from "./routes/connect";
import "./index.css";
import { store } from "./store";

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="connect" element={<Connect />} />
    </Route>
  ),
  {
    basename: "/passgen",
  }
);

ReactDOM.createRoot(document.querySelector("app") as HTMLElement).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="connect" element={<Connect />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreContext.Provider>
  </React.StrictMode>
);
