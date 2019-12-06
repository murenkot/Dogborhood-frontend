import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../../firebase';
// import Geocode from 'react-geocode';
// import Geocoder from 'react-native-geocoding';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import './Settings.css';

class Settings extends Component {
    state = {
        ownerName: '',
        dogName: '',
        avatar: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        changePhoto: false,
        selectedFile: '',
        fullAddress: '',
        latLng: '',
        storageref: firebase.storage().ref(),

    }

    componentDidMount = () => {
        this.getUserInfo();
    }

    getUserInfo = () => {
        let userId = this.props.currentUser;
        axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            withCredentials: true,
          })
            .then(res => {
                console.log(res);
                
              this.setState({
                ownerName: res.data.data.ownerName,
                dogName: res.data.data.dogName,
                avatar: res.data.data.avatar,
                street: res.data.data.address.street,
                city: res.data.data.address.city,
                state: res.data.data.address.state,
                zipcode: res.data.data.address.zipcode,
                latLng: res.data.data.coordinates
              });
            })
            // .then(()=>{this.getCoordinates()})
            .catch(err => console.log(err));
    };

    getCoordinates = (event) => {
        event.preventDefault();
        console.log("Getting coordinates......")
        let fullAddress = this.state.street + ", " + this.state.city + ", " + this.state.state + " " + this.state.zipcode;
        console.log(fullAddress);
        geocodeByAddress(fullAddress).then(
            results => getLatLng(results[0]).then(latLng => {
                console.log(latLng)
                this.setState({
                    latLng: latLng,
                }, this.saveChanges)
            })
        )
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    saveChanges = () => {
        console.log("saveChanges")
        const userId = localStorage.getItem('uid');
        
        let body = {
            ownerName: this.state.ownerName,
            dogName: this.state.dogName,
            avatar: this.state.avatar,
            address: {
                street: this.state.street,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
            },
            coordinates: {
                longitude: this.state.latLng.lng,
                latitude: this.state.latLng.lat,
            }
        }

        axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}/update`, body, {
            withCredentials: true,
        })
        .then(()=> this.props.history.push(`/user/${userId}`))
        .catch((err)=>console.log(err));
    };

    fileSelectedHandler = (photo) => {
        this.setState({
            selectedFile: photo[0]
        }, function() {
            this.state.storageref.child(`/photos-${localStorage.getItem('uid')}/avatar-${localStorage.getItem('uid')}`).put(this.state.selectedFile, {contentType: 'image/jpeg'}).then(snap => {
                snap.ref.getDownloadURL().then(url => {
                    this.setState( {
                     avatar: url,
                    });
                })
            })
        })
    }


    render () {
        return (
            <div className="settings-container">
                <h3>Edit Profile</h3>
                <p>People on Dogborhood will get to know you with the info below</p>
                <form onSubmit={this.getCoordinates}>
                    <p>Photo </p>
                    <div className="flex-row-container">
                        <div className="avatar-container">
                            <img id="avatar" src={this.state.avatar && this.state.avatar} alt="avatar"></img>
                        </div>
                        <div className="table-container change-photo-button-container">
                            {/* <button id="change-photo-button">Change photo</button> */}
                            <input id="change-photo-button" type="file" onChange={ (e) => this.fileSelectedHandler(e.target.files) } />


                        </div>

                    </div>
                   
                   
                    
                    <p>NAMES</p>
                    <div>
                        <label htmlFor="ownerName">Your Name</label>
                        <input onChange={this.handleChange} type="text" id="ownerName" name="ownerName" value={this.state.ownerName && this.state.ownerName } />
                    </div>
                    <div>
                        <label htmlFor="dogName">Your Dog's Name</label>
                        <input onChange={this.handleChange} type="text" id="dogName" name="dogName" value={this.state.dogName && this.state.dogName } />
                    </div>
                    <br />
                    <p>ADDRESS</p>
                    <div>
                        <label htmlFor="street">Street</label>
                        <input onChange={this.handleChange} type="text" id="street" name="street" value={this.state.street && this.state.street } />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input onChange={this.handleChange} type="text" id="city" name="city" value={this.state.city && this.state.city } />
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <select name="state" onChange={this.handleChange} value={this.state.state && this.state.state }>
                            <option name="state" value="select">...</option>
                            <option name="state" value="CA">CA</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="zipcode">Zipcode</label>
                        <input onChange={this.handleChange} type="text" id="zipcode" name="zipcode" value={this.state.zipcode && this.state.zipcode } />
                    </div>
                    <br />
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}

export default Settings;