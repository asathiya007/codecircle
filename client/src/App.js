import React, {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import Landing from './components/layout/Landing/Landing';
import Navigation from './components/layout/Navigation/Navigation';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import Alerts from './components/layout/Alerts/Alerts';
import Dashboard from './components/dashboard/Dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import AddEducation from './components/profile-forms/AddEducation/AddEducation';
import AddExperience from './components/profile-forms/AddExperience/AddExperience'; 
import Profiles from './components/profiles/Profiles/Profiles';
import Profile from './components/profile/Profile/Profile';
import Posts from './components/posts/Posts/Posts';
import Post from './components/post/Post/Post';
import NotFound from './components/layout/NotFound/NotFound';
// import Chats from './components/chats/Chats/Chats';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // randomized greeting 
  const greetings = [
    'What\'s on your mind?',
    'Care to comment?',
    'What do you think?',
    'Thoughts?',
    'Join the discussion!'
  ];
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profiles/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/codeworld" component={Posts}/>
            <PrivateRoute exact path="/codeworld/:id" component={Post} greeting={greeting} />
            {/* <PrivateRoute exact path="/chats" component={Chats} /> */}
            <Route component={NotFound}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
