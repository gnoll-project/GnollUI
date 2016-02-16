import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import GUICreator from './components/gui-creator';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={GUICreator} />
  </Route>
);
