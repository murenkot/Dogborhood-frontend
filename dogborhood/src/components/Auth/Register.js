import React, { Component } from 'react';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {withRouter} from 'react-router-dom';


// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';

import './Register.css';

class Register extends Component {
  state = {
    ownerName: '',
    dogName: '',
    street: '',
    city: '',
    state: 'select',
    zipcode: '',
    email: '',
    password: '',
    password2: '',
    latLng: '',
    lng: '',
    lat: '',
  };

  handleChange = (event) => {
    // console.log(event);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    // event.preventDefault();
    console.log(this.state);
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, this.state, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        console.log(this.props.setCurrentUser);
        this.props.setCurrentUser(res.data.data);
        this.props.history.push(`/`);
        // this.props.refreshPage();

      })
      .catch((err) => console.log(err));
  }

  getCoordinates = (event) => {
    event.preventDefault();
    console.log("Getting coordinates......")
    let fullAddress = this.state.street + ", " + this.state.city + ", " + this.state.state + " " + this.state.zipcode;
    // console.log(fullAddress);
    geocodeByAddress(fullAddress).then(
      results => getLatLng(results[0]).then(latLng => {
          console.log(latLng)
          this.setState({
              lat: latLng.lat,
              lng: latLng.lng,
          }, this.handleSubmit)
      })
    )
}

  render() {
    return (
    
    <div className="form-container">
        <div className="submit-button-container">
          <button id="switch-button" onClick={this.props.handleSwitch}>Login</button>
        </div>
        <form onSubmit={this.getCoordinates}>

            <h3>Sign Up</h3>
            <div>
                <label className="label" htmlFor="email">Email</label><br/>
                <input className="input-big" onChange={this.handleChange} type="email" id="email" name="email" value={this.state.email} placeholder="Enter email"   />
            </div>
            <div className="flex-row-container">
              <div className="input-container">
                  <label className="label" htmlFor="password">Password</label>
                  <input className="inline-element password" onChange={this.handleChange} type="password" id="password" name="password" placeholder="Enter your password" />
              </div>
              <div className="input-container">
                  <label className="label" htmlFor="password2">Confirm Password</label>
                  <input className="inline-element password2" onChange={this.handleChange} type="password" id="password2" name="password2" placeholder="Confirm your password"   />
              </div>
            </div>
            <br/>
            <p>Introduce yourself</p>
            <div className="flex-row-container">
              <div className="input-container">
                  <label className="label" htmlFor="ownerName">Your Name</label><br/>
                  <input className="password" onChange={this.handleChange} type="text" id="ownerName" name="ownerName" placeholder="Enter your name" />
              </div>
              <div className="input-container">
                  <label className="label" htmlFor="dogName">Your Dog's Name</label><br/>
                  <input className="password" onChange={this.handleChange} type="text" id="dogName" name="dogName" placeholder="Enter your dog's name" />
              </div>
            </div>
            <br/>
            <p>Where do you live?</p>
            <div>
                <label className="label" htmlFor="street">Sreet</label><br/>
                <input className="input-big" onChange={this.handleChange} type="text" id="street" name="street" placeholder="111 Green Avenue" />
            </div>
            <div className="flex-row-container">

              <div className="input-container">
                  <label className="label" htmlFor="city">City</label><br/>
                  <input className="password" onChange={this.handleChange} type="text" id="city" name="city" placeholder="San Francisco" />
              </div>
              <div>
                  <label className="label" htmlFor="state">State</label><br/>
                  <select id="state" name="state" onChange={this.handleChange} value={this.state.state}>
                      <option name="state" value="select">...</option>
                      <option name="state" value="CA">CA</option>
                  </select>
              </div>
              <div className="zipcode-container">
                  <label className="label" htmlFor="zipcode">Zipcode</label><br/>
                  <input id="zipcode" onChange={this.handleChange} type="text" id="zipcode" name="zipcode" placeholder="94111" />
              </div>
            </div>

            {/* <button className="btn btn-primary float-right" type="submit">Sign Up</button> */}
        </form>
        <div className="submit-button-container">
          <button id="submit" type="submit">Sign Up</button>
        </div>

    </div>

    
    )
  }
};

export default withRouter(Register);
