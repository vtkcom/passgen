import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./home";
import Connect from "./connect";
import Wallet from "./connect/wallet";
import Profile from "./profile";
import Accounts from "./profile/accounts";

const isDev = process.env.NODE_ENV === "development";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="connect">
        <Route index element={<Connect />} />
        <Route path=":wallet" element={<Wallet />} />
      </Route>
      <Route path="profile" element={<Profile />}>
        <Route index element={<Navigate to="/profile/generate" replace />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="settings" element={<Accounts />} />
        <Route path="generate" element={<Accounts />} />
      </Route>
    </Route>
  ),
  {
    basename: isDev ? "/" : "/passgen",
  }
);
