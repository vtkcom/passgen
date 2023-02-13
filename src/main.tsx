import "@twa-dev/sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StoreContext } from "storeon/react";
import { router } from "./routes";
import { store } from "./store";
// import "./index.css";

ReactDOM.createRoot(document.querySelector("app") as HTMLElement).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
);
