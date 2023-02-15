import { darken } from "polished";
import styled from "styled-components";
import { Button } from "../../button/@ui";

const k = 0.75;

export const Radio = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: 0.4rem;
  grid-auto-columns: 1fr;
  padding: 0.4rem 0.4rem;
  background: ${(p) => darken(0.03, p.theme.bg_color)};
  /* border-radius: ${(p) => p.theme.border_radius}; */
  /* border-radius: calc(${(p) => p.theme.border_radius} * 1.25); */
  /* box-shadow: inset ${(p) => p.theme.shadow}; */
  /* border: ${(p) => p.theme.border}; */
  min-height: 3.5rem;
  /* margin: 0 0.5rem; */
  ${Button} {
    padding: 0rem;
    height: 100%;
    min-height: auto;
  }
  a {
    text-decoration: none;
    &:not(:last-child),
    &:not(:first-child) {
      ${Button} {
        border-radius: 0.5rem;
      }
    }
    &:last-child {
      ${Button} {
        border-radius: 0.5rem calc(${(p) => p.theme.border_radius} * ${k})
          calc(${(p) => p.theme.border_radius} * ${k}) 0.5rem;
      }
    }
    &:first-child {
      ${Button} {
        border-radius: calc(${(p) => p.theme.border_radius} * ${k}) 0.5rem
          0.5rem calc(${(p) => p.theme.border_radius} * ${k});
      }
    }
  }
`;
