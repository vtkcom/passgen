import styled from "styled-components";
import toncoin from "../../../assets/toncoin-bg.svg";
import settings from "../../../assets/settings-bg.svg";
import accounts from "../../../assets/accounts-bg.svg";
import generate from "../../../assets/generate-bg.svg";
import { opacify } from "polished";

export const Button = styled.div`
  padding: 1rem 2rem;
  min-height: 3.5rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  display: grid;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  grid-auto-flow: column;
  /* grid-template-columns: auto max-content; */
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  & > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &.toncoin {
    background-image: url(${toncoin});
    background-size: 6.5rem;
    background-position: center;
  }
  &.settings {
    background-image: url(${settings});
    background-size: 6.5rem;
    background-position: center;
  }
  &.accounts {
    background-image: url(${accounts});
    background-size: 6.5rem;
    background-position: center;
  }
  &.generate {
    background-image: url(${generate});
    background-size: 6.5rem;
    background-position: center;
  }
  &.primary {
    background-color: ${(p) => p.theme.button_color};
    color: ${(p) => p.theme.button_text_color};
  }
  &.ghost {
    background-color: ${(p) => opacify(-0.98, p.theme.button_color)};
    color: ${(p) => p.theme.hint_color};
  }
`;
