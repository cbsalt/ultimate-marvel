import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Characters from '../pages/Characters';
import Comics from '../pages/Comics';
import ComicDetails from '../pages/ComicDetails';
import CharacterDetails from '../pages/CharacterDetails';
import FavoritesCharacters from '../pages/FavoritesCharacters';

import FavoritesComics from '../pages/FavoritesComics';
import { MenuContext } from '../context/Menu';

import NavMenu from '../components/NavMenu';
import Header from '../components/Header';

const Routes: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (e: boolean) => {
    setOpen(!e);
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
        <Route path="/comics" component={Comics} />
        <Route path="/comic/:comic+" component={ComicDetails} />
        <Route path="/character/:character+" component={CharacterDetails} />
        <Route path="/favorites/characters" component={FavoritesCharacters} />
        <Route path="/favorites/comics" component={FavoritesComics} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
