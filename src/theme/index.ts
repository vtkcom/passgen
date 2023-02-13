import { DefaultTheme } from "styled-components";
import WebApp from "@twa-dev/sdk";
import { opacify } from "polished";

let theme: DefaultTheme = {
  bg_color: WebApp.themeParams.bg_color ?? "#121212",
  button_color: WebApp.themeParams.button_color ?? "#7b8799",
  button_text_color: WebApp.themeParams.button_text_color ?? "#ffffff",
  hint_color: WebApp.themeParams.hint_color ?? "#82868a",
  link_color: WebApp.themeParams.link_color ?? "#a6b8cd",
  secondary_bg_color: WebApp.themeParams.secondary_bg_color ?? "#313b43",
  text_color: WebApp.themeParams.text_color ?? "#f5f5f5",

  font_size: "16px",
  font_family: "Roboto, Tahoma, Verdana, Arial, sans-serif",
  border_radius: "1rem",
};

theme = {
  ...theme,
  shadow: `0px 0px 10px 0px ${opacify(-0.9, theme.hint_color)}`,
  border: `1px solid ${opacify(-0.9, theme.hint_color)}`,
};

export { theme };
