import styled, { createGlobalStyle, keyframes } from "styled-components";
import { opacify } from "polished";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  html,
  body {
    font-size: ${(p) => p.theme.font_size};
    background-color: ${(p) => p.theme.bg_color};
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  body {
    margin: 0 auto;
    max-width: 40rem;
    padding: 0;
    font-family: ${(p) => p.theme.font_family};
    font-style: normal;
    font-weight: 400;
    color: ${(p) => p.theme.text_color};
  }
  body,
  app {
    display: grid;
    -webkit-overflow-scrolling: touch;
  }
  app {
    grid-template-rows: auto max-content max-content;
    padding: 0.5rem 0;
    gap: 1rem;
  }
  a {
    color: ${(p) => p.theme.link_color};

    &:hover {
      color: ${(p) => p.theme.hint_color};
    }
  }
  h1,
  h2,
  h3,
  h4 {
    margin: 0.2rem 0 0.5rem;
    font-style: normal;
    font-weight: 400;
  }
  input {
    user-select: initial;
  }
`;

export const Main = styled.div`
  display: grid;
`;

export const Content = styled.div`
  padding: 0.6rem 1.5rem;
  position: sticky;
  bottom: -1px;
  &.sticky {
    padding-bottom: calc(0.6rem + 1px);
    background-color: ${(p) => opacify(-0.95, p.theme.bg_color)};
    backdrop-filter: saturate(110%) blur(0.6rem);
  }
  &.tdesktop {
    background-color: ${(p) => p.theme.bg_color};
  }
  &:empty {
    padding: 0;
  }
  & a {
    text-decoration: none;
  }
`;

export const Profile = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  min-height: 3.5rem;
  & svg {
    color: ${(p) => p.theme.hint_color};
  }
`;

export const Wallet = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-rows: max-content;
  gap: 0.5rem;
`;

const anim = keyframes`
  from {
    opacity: 0;
    font-size: 0.3rem;
  }
  to {
    opacity: 1;
    font-size: 1rem;
  }
`;

export const Information = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  align-content: center;
  & > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & .dns {
    color: ${(p) => p.theme.hint_color};
    animation: ${anim} 0.3s forwards;
  }
`;

export const Footer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: space-between;
  align-items: center;
  color: ${(p) => p.theme.hint_color};
  padding: 0 1.5rem;
  line-height: 1;
  font-size: 0.8rem;
  span {
    display: grid;
    grid-auto-flow: column;
    gap: 0.3rem;
    grid-auto-columns: max-content;
    justify-content: center;
    align-items: center;
  }
`;
