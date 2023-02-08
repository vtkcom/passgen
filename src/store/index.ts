import { createStoreon } from "storeon";
import { persistState } from "@storeon/localstorage";
import { storeonLogger } from "storeon/devtools";
import {
  profile,
  type State as ProfileState,
  type Event as ProfileEvent,
} from "./profile";
import {
  connect,
  type State as ConnectState,
  type Event as ConnectEvent,
} from "./connect";

export type State = ProfileState & ConnectState;
export type Event = ProfileEvent & ConnectEvent;

export const store = createStoreon<State, Event>([
  connect,
  profile,
  process.env.NODE_ENV !== "production" && storeonLogger,
  persistState(["connect"]),
]);
