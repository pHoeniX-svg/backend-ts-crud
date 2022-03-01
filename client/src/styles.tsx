import { createGlobalStyle, css } from 'styled-components';

const basicStyles = css`
  :root {
    /* colors */
    --clr-neutral: #fff;
    --clr-grey-light: #eee;
    --clr-grey-mid: #353535;
    --clr-grey-dark: #1c1c1c;

    /* font-sizes */
    --fs-900: 5.6rem;
    --fs-800: 4rem; //  --fontSuperBig
    --fs-700: 2.4rem; // --fontBig
    --fs-600: 2rem; // --fontMed
    --fs-500: 1.8rem;
    --fs-400: 1.6rem; // --fontSmall
    --fs-300: 1.4rem;
    --fs-200: 1.2rem;
    --fs-100: 1rem;
    --max-width: 128rem;
  }

  /* Set core root defaults */
  html {
    box-sizing: border-box;
    font-size: 50%;
    text-rendering: optimizeSpeed;

    @media screen and (min-width: 45em) {
      font-size: 56.25%;
    }
    @media screen and (min-width: 75em) {
      font-size: 62.5%;
    }
    @media screen and (min-width: 112.5em) {
      font-size: 75%;
    }

    &,
    &:focus-within {
      scroll-behavior: smooth;
    }
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    font-family: 'Abel', sans-serif;
    line-height: 1.5;
    text-rendering: optimizeSpeed;
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* SCROLLBAR RESET */
  // Firefox
  * {
    scrollbar-width: thin;
    scrollbar-color: #434343 #111;
  }

  // Webkit Browsers: Chromium, Safari
  html::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
    background: var(--clr-grey-dark);
  }
  html::-webkit-scrollbar-thumb {
    background: #434343;
    border-radius: 1rem;
    box-shadow: inset 2px 2px 2px hsl(0deg 0% 100% / 25%),
      inset -2px -2px 2px rgb(0 0 0 / 25%);
  }
  html::-webkit-scrollbar-track {
    background: linear-gradient(90deg, #434343, #434343 1px, #111 0, #111);
  }

  /* Make images easier to work with */
  /* :not([hidden]) selector fixes display issues */
  img,
  picture:not([hidden]) {
    height: auto;
    display: block;
    max-width: 100%;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Inherit fonts for inputs and buttons */
  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* TYPOGRAPHY */

  .fs-800 {
    font-size: var(--fs-800);
  }
  .fs-700 {
    font-size: var(--fs-700);
  }
  .fs-600 {
    font-size: var(--fs-600);
  }
  .fs-500 {
    font-size: var(--fs-500);
  }
  .fs-400 {
    font-size: var(--fs-400);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1 {
    color: var(--clr-neutral);
    font-size: 3.2rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.76rem;
    font-weight: 600;
  }

  p {
    color: var(--clr-neutral);
  }

  /* FLOW UTILITY */
  .flow > *:where(:not(:first-child)) {
    margin-block-start: var(--flow-space, 1.6rem);
  }
  .flow-space--small {
    --flow-space: 1rem;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${basicStyles}
`;

export { GlobalStyle };
