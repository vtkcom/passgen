import { createStoreon } from "storeon";
import { persistState } from "@storeon/localstorage";
import {
  profile,
  type State as ProfileState,
  type Event as ProfileEvent,
} from "./profile";

export type State = ProfileState;
export type Event = ProfileEvent;

export const store = createStoreon<State, Event>([
  profile,
  persistState(["profile"]),
]);
