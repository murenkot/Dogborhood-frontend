import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
  };

  componentDidMount = () => {
    let uid = localStorage.getItem('uid');
    uid && this.setCurrentUser(uid);
  }

  setCurrentUser = (userId) => {
    this.setState({ currentUser: userId });
    localStorage.setItem('uid', userId);
  };

  logout = () => {
    localStorage.removeItem('uid');
    // axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, { withCredentials: true })
    axios.post(`http://localhost:4000/api/v1/auth/logout`, null, { withCredentials: true })

      .then(res => {
        console.log(res);
        this.setState({ currentUser: null });
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <Navbar currentUser={this.state.currentUser} logout={this.logout} />
        {/* {routes} */}
        <div className="container">
          <Routes currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
        </div>
        <Footer />

      </>
    );
  }
}

export default withRouter(App);
