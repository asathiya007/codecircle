import React, {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './components/layout/Landing/Landing';
import Navigation from './components/layout/Navigation/Navigation';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import Alerts from './components/layout/Alerts/Alerts';
import Dashboard from './components/dashboard/Dashboard/Dashboard';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route component={Navigation} />
          <Route component={Alerts} />
          <Switch>
            <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
