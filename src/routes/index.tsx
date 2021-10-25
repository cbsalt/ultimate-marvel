import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CharactersFinder from '../pages/CharactersFinder';
import ComicsFinder from '../pages/ComicsFinder';
import ComicDetails from '../pages/ComicDetails';
import CharacterDetails from '../pages/CharacterDetails';
import FavoriteCharacters from '../pages/FavoriteCharacters';
import FavoriteComics from '../pages/FavoriteComics';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={CharactersFinder} exact />
      <Route path="/comics" component={ComicsFinder} />
      <Route path="/comic/:comic+" component={ComicDetails} />
      <Route path="/character/:character+" component={CharacterDetails} />
      <Route path="/favorites/characters" component={FavoriteCharacters} />
      <Route path="/favorites/comics" component={FavoriteComics} />
    </Switch>
  );
};

export default Routes;
