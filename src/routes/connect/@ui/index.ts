import styled from "styled-components";

export const Content = styled.div`
  display: grid;
  gap: 1rem;
`;

export const Wallet = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content auto;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
  border: ${(p) => p.theme.border};
  border-radius: ${(p) => p.theme.border_radius};
  box-shadow: ${(p) => p.theme.shadow};
  cursor: pointer;
  & > svg {
    filter: grayscale(0.8);
  }
  & .information {
    display: grid;
    gap: 0.5rem;
    font-size: 1.2rem;
    & > div {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: max-content auto;
      align-items: start;
      color: ${(p) => p.theme.hint_color};
      gap: 0.5rem;
      font-size: 0.9rem;
    }
  }
`;
