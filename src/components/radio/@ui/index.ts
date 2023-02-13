import { darken } from "polished";
import styled from "styled-components";
import { Button } from "../../button/@ui";

export const Radio = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: 0.4rem;
  grid-auto-columns: 1fr;
  padding: 0.3rem 0.4rem;
  background: ${(p) => darken(0.03, p.theme.bg_color)};
  border-radius: calc(${(p) => p.theme.border_radius} * 1.25);
  box-shadow: inset ${(p) => p.theme.shadow};
  border: ${(p) => p.theme.border};
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
        border-radius: 0.5rem 1rem 1rem 0.5rem;
      }
    }
    &:first-child {
      ${Button} {
        border-radius: 1rem 0.5rem 0.5rem 1rem;
      }
    }
  }
`;
