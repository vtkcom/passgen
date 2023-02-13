import { opacify } from "polished";
import styled from "styled-components";

export const Connect = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  border: 1px solid ${(p) => opacify(-0.9, p.theme.hint_color)};
  border-radius: 1rem;
  box-shadow: 0px 3px 10px 0px ${(p) => opacify(-0.9, p.theme.hint_color)};
  & p {
    margin: 0;
    text-align: center;
    color: ${(p) => p.theme.hint_color};
  }
`;
