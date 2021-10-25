import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from '../../routes';
import { MenuContext } from '../../context/Menu';
import defaultTheme from '../../assets/styles/themes/default';
import GlobalStyles from '../../styles/global';

import NavMenu from '../NavMenu';
import Header from '../Header';

import { Container } from './styles';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (e: boolean) => {
    setOpen(!e);
  };

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <MenuContext.Provider
            value={{
              open,
              handleOpenNavMenu,
            }}
          >
            <Header />
            <NavMenu />
          </MenuContext.Provider>

          <Container>
            <Routes />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
      <GlobalStyles />
      <ToastContainer autoClose={3500} />
    </>
  );
};

export default App;
