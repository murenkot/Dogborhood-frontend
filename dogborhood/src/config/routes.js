import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import ProfileContainer from '../containers/ProfileContainer/ProfileContainer';
import Settings from '../components/Settings/Settings';


export default ({ currentUser, setCurrentUser }) => (
  <Switch>
    <Route exact path='/' render={() => <HomeContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />}/>
    {/* <Route path='/register' component={Register} />
    <Route path='/login' render={() => <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} /> */}
    <Route exact path='/user/:id' component={ProfileContainer} />
    <Route exact path='/settings' render={()=> <Settings currentUser={currentUser} />} />
  
  </Switch>
)
