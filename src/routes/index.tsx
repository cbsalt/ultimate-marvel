import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CharactersFinder from '../pages/CharactersFinder';
import ComicsFinder from '../pages/ComicsFinder';
import ComicDetails from '../pages/ComicDetails';
import CharacterDetails from '../pages/CharacterDetails';
import FavoriteCharacters from '../pages/FavoriteCharacters';

import FavoriteComics from '../pages/FavoriteComics';
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
        <Route path="/" component={CharactersFinder} exact />
        <Route path="/comics" component={ComicsFinder} />
        <Route path="/comic/:comic+" component={ComicDetails} />
        <Route path="/character/:character+" component={CharacterDetails} />
        <Route path="/favorites/characters" component={FavoriteCharacters} />
        <Route path="/favorites/comics" component={FavoriteComics} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
