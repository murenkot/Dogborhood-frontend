import React from 'react';

import AuthContainer from '../../containers/AuthContainer/AuthContainer';
import { tsPropertySignature } from '@babel/types';

const Home = (props) => {
  let test = () => {
    console.log(localStorage.getItem('uid'))
    return (
      <p>You are logged in!</p>
    )
  }

  return (
    <div className="container">
        <h1>Home</h1>
        {localStorage.getItem('uid') ? 
        test() :
        <AuthContainer setCurrentUser={props.setCurrentUser} />}
    </div>
  )

  
  };

export default Home;
