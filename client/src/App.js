import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from "./components/layout/Landing/Landing";
import Navigation from "./components/layout/Navigation/Navigation";

function App() {
  return (
    <Router>
      <Fragment>
        <Route component={Navigation}/>
        <Switch>
          <Route exact path="/" component={Landing}/>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
