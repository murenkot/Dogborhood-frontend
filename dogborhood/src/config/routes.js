import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import ProfileContainer from '../containers/ProfileContainer/ProfileContainer';



export default ({ currentUser, setCurrentUser }) => (
  <Switch>
    <Route exact path='/' render={() => <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />}/>
    {/* <Route path='/register' component={Register} />
    <Route path='/login' render={() => <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} /> */}
    <Route exact path='/user/:id' component={ProfileContainer} />
  
  </Switch>
)
