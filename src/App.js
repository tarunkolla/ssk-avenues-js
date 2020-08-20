import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import Account from './components/Account.js';
import Buy from './components/Buy.js';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home.js';
import NotFound from './components/NotFound.js';
import LayoutOverview from './components/LayoutOverview.js';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/account" component={Account} />
      <Route exact path="/buy/layouts/:id" component={LayoutOverview} />
      <Route exact path="/projects" component={Buy} />
      <Route exact path="/" component={Home} />

      <Route path="/" component={NotFound} />
    </Switch>
  );
};

const App = () => {
  //check if a user exists and is authorized
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <NavigationBar />
        <Navigation />
      </Router>
    </Provider>
  );
};

export default App;
