/// <reference types="vite/client" />
// import original module declarations
import "styled-components";
import WebApp from "@twa-dev/sdk";

type WebAppTheme = typeof WebApp["themeParams"];

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends WebAppTheme {
    font_size: string;
    font_family: string;
    border_radius: string;
    shadow?: string;
    border?: string;
  }
}
