import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./home";
import About from "./about";
import Connect from "./connect";
import Wallet from "./connect/wallet";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="connect" element={<Connect />} />
      <Route path="connect/:wallet" element={<Wallet />} />
    </Route>
  ),
  {
    basename: process.env.NODE_ENV === "development" ? "/" : "/passgen",
  }
);
