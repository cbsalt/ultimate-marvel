import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import defaultTheme from './assets/styles/themes/default';
import GlobalStyles from './styles/global';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
    <GlobalStyles />
    <ToastContainer autoClose={3500} />
  </>
);

export default App;
