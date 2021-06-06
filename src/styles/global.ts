import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import charactersBackground from '../assets/marvel-characters.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f0f0f5 url(${charactersBackground}) no-repeat 50% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    min-height: 100%;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }
`;
