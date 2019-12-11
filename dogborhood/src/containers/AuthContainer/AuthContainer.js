import React, { Component } from 'react';

import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';

import './AuthContainer.css';



class AuthContainer extends Component {
    state = {
        login: true,
    }

    handleSwitch = () => {
        this.setState(prevState => ({
            login: !prevState.login,
          }))
    }

    render () {
        return (
            <div className="auth-container">
                <p className="auth-logo">Welcom to our <h1>Dorborhood</h1></p>
                {this.state.login ?
                <Login handleSwitch={this.handleSwitch} setCurrentUser={this.props.setCurrentUser}/> :
                <Register refreshPage={this.props.refreshPage} handleSwitch={this.handleSwitch} setCurrentUser={this.props.setCurrentUser}/>
                }
            </div>
        )
    }
}

export default AuthContainer;