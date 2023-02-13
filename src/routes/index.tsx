import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./layout";
import Profile from "./profile";
import Accounts from "./profile/accounts";
import Home from "./home";
import Connect from "./connect";
import Wallet from "./connect/wallet";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="connect" element={<Connect />} />
      <Route path="connect/:wallet" element={<Wallet />} />
      <Route path="profile" element={<Profile />}>
        <Route path="accounts" element={<Accounts />} />
        <Route path="settings" element={<Accounts />} />
        <Route path="generate" element={<Accounts />} />
      </Route>
    </Route>
  ),
  {
    basename: process.env.NODE_ENV === "development" ? "/" : "/passgen",
  }
);
