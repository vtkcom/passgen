import styled from "styled-components";

export const Button = styled.div`
  background-color: ${(p) => p.theme.button_color};
  color: ${(p) => p.theme.button_text_color};
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
  grid-template-columns: auto max-content;
  cursor: pointer;
  & > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &.toncoin {
    background-image: url(/toncoin-bg.svg);
    background-size: 6.5rem;
    background-position: center;
  }
`;
