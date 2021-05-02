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
import Contact from './components/Contact.js';
import About from './components/About.js';
import Power from './components/Power.js';
import Construction from './components/Construction';

import './styles/App.scss';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/account" component={Account} />
      <Route exact path="/realestate/layouts/:id" component={LayoutOverview} />
      <Route exact path="/realestate" component={Buy} />
      <Route exact path="/construction" component={Construction} />
      <Route exact path="/power" component={Power} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/about" component={About} />
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
    <>
      <div className="bg-home-image" />
      <Provider store={store}>
        <Router>
          <NavigationBar />
          <Navigation />
        </Router>
      </Provider>
    </>
  );
};

export { Navigation };
export default App;
