import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
    --tick-transform-origin: 50% 65vmin;
  }

* {
  margin: 0;
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

html {
  overflow: hidden !important;
}

body,
html {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto !important;
  height: 132vmin !important;
  width: 132vmin !important;
  line-height: normal !important;

  @media (max-aspect-ratio: 100/75.3) {

    height: 100vmax !important;
    width: 100vmax !important;
    --tick-transform-origin: 50% 49vmax; 

    @media (max-aspect-ratio: 1/1) {
      height: 100vmin !important;
      width: 100vmin !important;
      --tick-transform-origin: 50% 49vmin;

    }
  }
}

body {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

#main {
  height: 98% !important;
  width: 98% !important;
}

svg {
  left: 0;
}

`;
