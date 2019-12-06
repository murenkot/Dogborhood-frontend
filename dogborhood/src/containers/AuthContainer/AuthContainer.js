import React, { Component } from 'react';

import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';



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
            <div>
                {this.state.login ?
                <Login handleSwitch={this.handleSwitch} setCurrentUser={this.props.setCurrentUser}/> :
                <Register handleSwitch={this.handleSwitch} setCurrentUser={this.props.setCurrentUser}/>
                }
            </div>
        )
    }
}

export default AuthContainer;