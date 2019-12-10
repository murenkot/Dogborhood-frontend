import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, this.state, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        this.props.setCurrentUser(res.data.data);
        this.props.history.push('/');
      })
      .then(()=> console.log(this.props.currentUser))
      .catch((err) => console.log(err));
  }

  render() {

      return (
        <div className="form-container-login-x">
          <div className="submit-button-container">
            <button id="switch-button" onClick={this.props.handleSwitch}>Sign Up</button>
          </div>
            <h4 className="">Login</h4>
            <form onSubmit={this.handleSubmit}>
              <div >
                <label className="label" htmlFor="name">Email</label><br/>
                <input className="bb" onChange={this.handleChange} className="input-login" type="email" id="email" name="email" value={this.state.email} />
              </div>
              <div >
                <label className="label" htmlFor="password">Password</label><br/>
                <input className="bb" onChange={this.handleChange} className="input-login" type="password" id="password" name="password" value={this.state.password} />
              </div>
              <div className="submit-button-container">
                <button id="submit" type="submit">Login</button>
              </div>              
            </form>
          </div>
      )
    }
    
};

export default withRouter(Login);
