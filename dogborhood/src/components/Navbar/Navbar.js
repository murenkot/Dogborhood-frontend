import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

// class Navbar extends Component {
//   render() {
const Navbar = (props) => {

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand"  to="/">Dogborhood</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav ml-auto">
            {props.currentUser &&
            <>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/user/" + props.currentUser}>Profile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/messages">Messages</NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={props.logout}>Logout</span>
              </li>
            </>
            }
            </ul>
          </div>
        </div>
      </nav>
    )
  // }

};

export default Navbar;
