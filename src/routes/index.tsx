import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "./about";
import Connect from "./connect";
import Home from "./home";
import Layout from "./layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="connect" element={<Connect />} />
    </Route>
  ),
  {
    basename: process.env.NODE_ENV === "development" ? "/" : "/passgen",
  }
);
