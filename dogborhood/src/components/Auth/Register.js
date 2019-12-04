import React, { Component } from 'react';
import axios from 'axios';

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
  };

  handleChange = (event) => {
    // console.log(event);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    // event.preventDefault();
    console.log(this.state);
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, this.state)
      .then((res) => {
        console.log(res);
        this.props.setCurrentUser(res.data.data);
        this.props.history.push(`/users/${res.data.data}`);

      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
    
    <div className="form-container">
        <button onClick={this.props.handleSwitch}>Login</button>
        <form onSubmit={this.handleSubmit}>

            <h3>Sign Up</h3>
            <div>
                <label htmlFor="email">Email</label>
                <input onChange={this.handleChange} type="email" id="email" name="email" value={this.state.email} placeholder="Enter email"   />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={this.handleChange} type="password" id="password" name="password" placeholder="Enter your password" />
            </div>
            <div>
                <label htmlFor="password2">Confirm Password</label>
                <input onChange={this.handleChange} type="password" id="password2" name="password2" placeholder="Confirm your password"   />
            </div>
            <p>Introduce yourself</p>
            <div>
                <label htmlFor="ownerName">Your Name</label>
                <input onChange={this.handleChange} type="text" id="ownerName" name="ownerName" placeholder="Enter your name" />
            </div>
            <div>
                <label htmlFor="dogName">Your Dog's Name</label>
                <input onChange={this.handleChange} type="text" id="dogName" name="dogName" placeholder="Enter your dog's name" />
            </div>
            <p>Where do you live?</p>
            <div>
                <label htmlFor="street">Sreet</label>
                <input onChange={this.handleChange} type="text" id="street" name="street" placeholder="111 Green Avenue" />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input onChange={this.handleChange} type="text" id="city" name="city" placeholder="San Francisco" />
            </div>
            <div>
                <label htmlFor="state">State</label>
                <select name="state" onChange={this.handleChange} value={this.state.state}>
                    <option name="state" value="select">...</option>
                    <option name="state" value="CA">CA</option>
                </select>
            </div>
            <div>
                <label htmlFor="zipcode">Zipcode</label>
                <input onChange={this.handleChange} type="text" id="zipcode" name="zipcode" placeholder="94111" />
            </div>
            <button type="submit">Sign Up</button>
        </form>

    {/* <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
        </Form.Row>

        <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

        </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */}
    </div>

    
    )
  }
};

export default Register;
