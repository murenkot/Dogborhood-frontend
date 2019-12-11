import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Navbar.css';


const Navbar = (props) => {

    return (
      <>
      {props.currentUser && 
      <nav className="fixed">
        <div className="flex-row-container">

       
          <div className="logo">
            <h1>Dogborhood</h1>
          </div>
          <div className="flex-nav-container">
                {props.currentUser &&
                <>
                  <span>
                    <NavLink style={{ textDecoration: 'none', color:'#545454' }}  className="nav-link" exact to="/">Home</NavLink>
                  </span>
                  <span>
                    <NavLink style={{ textDecoration: 'none', color:'#545454' }}  className="nav-link" to={"/user/" + props.currentUser}>Profile</NavLink>
                  </span>
                  <span>
                    <NavLink style={{ textDecoration: 'none', color:'#545454' }}  className="nav-link" to="/messages">Messages</NavLink>
                  </span>
                  <span>
                    <a href="#"><span style={{ textDecoration: 'none', color:'#545454' }} className="nav-link" onClick={props.logout}>Logout</span></a>
                  </span>
                </>
                }
          </div>
        </div>
      </nav>
            }
      </>
    )

};

export default Navbar;
