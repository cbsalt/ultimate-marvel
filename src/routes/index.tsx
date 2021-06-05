import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Dashboard from '../pages/Dashboard';
import Characters from '../pages/Characters';
import CharactersDetails from '../pages/CharacterDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Characters} exact />
    <Route path="/character/:character+" component={CharactersDetails} />
  </Switch>
);

export default Routes;
