import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Characters from '../pages/Characters';
import CharacterDetails from '../pages/CharacterDetails';
import FavoritesCharacters from '../pages/FavoritesCharacters';

import FavoritesComics from '../pages/FavoritesComics';
import { MenuContext } from '../context/Menu';

import NavMenu from '../components/NavMenu';
import Header from '../components/Header';

const Routes: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
      <MenuContext.Provider
        value={{
          open,
          handleOpenNavMenu,
        }}
      >
        <Header />
        <NavMenu />
      </MenuContext.Provider>

      <Switch>
        <Route path="/" component={Characters} exact />
        <Route path="/character/:character+" component={CharacterDetails} />
        <Route path="/favorites/characters" component={FavoritesCharacters} />
        <Route path="/favorites/comics" component={FavoritesComics} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
