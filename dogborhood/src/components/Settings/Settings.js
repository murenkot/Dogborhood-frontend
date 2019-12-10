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
        lat: '',
        lng: '',


    }

    componentDidMount = () => {
        console.log("componentDidMount...")
        this.getUserInfo();
    }

    getUserInfo = () => {
        console.log("getUserInfo...")

        let userId = this.props.currentUser;
        axios.get(`${process.env.REACT_APP_API_URL}/users/byId/${userId}`, {
            withCredentials: true,
          })
            .then(res => {
                console.log(res);
                
              this.setState({
                ownerName: res.data.data.ownerName,
                dogName: res.data.data.dogName,
                avatar: res.data.data.avatar,
                street: res.data.data.street,
                city: res.data.data.city,
                state: res.data.data.state,
                zipcode: res.data.data.zipcode,
                lat: res.data.data.lat,
                lng: res.data.data.lng,
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
            results => getLatLng(results[0])
            .then(latLng => {
                console.log(latLng)
                this.setState({
                    lat: latLng.lat,
                    lng: latLng.lng,
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
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            // coordinates: {
            //     longitude: this.state.latLng.lng,
            //     latitude: this.state.latLng.lat,
            // },
            lat: this.state.lat,
            lng: this.state.lng,
        }

        axios.put(`${process.env.REACT_APP_API_URL}/users/update/${userId}`, body, {
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
            <div className="flex-row-container settings-page-container">
                <div className="settings-switch-buttons-container">
                    <div className="settings-switch-button">
                        <span><strong>Edit Profile</strong></span>
                    </div>
                    <div className="settings-switch-button">
                        <span>Privacy</span>
                    </div>
                    <div className="settings-switch-button">
                        <span>Delete Profile</span>
                    </div>
                </div>
                <div className="settings-container">
                <h3>Edit Profile</h3>
                <p>People on Dogborhood will get to know you with the info below</p>
                <form onSubmit={this.getCoordinates}>
                    <div className="flex-row-container">
                        <div className="avatar-container">
                            <img id="avatar" src={this.state.avatar && this.state.avatar} alt="avatar"></img>
                        </div>
                        <div className="table-container change-photo-button-container">
                            {/* <button id="change-photo-button">Change photo</button> */}
                            <input id="change-photo-button" type="file" onChange={ (e) => this.fileSelectedHandler(e.target.files) } />
                        </div>
                    </div>
                   
                   
                    <p className="settings-titles">NAMES</p>
                    <div className="flex-row-container">

                        <div className="input-container">
                            <label className="label" htmlFor="ownerName">Your Name</label><br/>
                            <input className="inline-element password bb" onChange={this.handleChange} type="text" id="ownerName" name="ownerName" value={this.state.ownerName && this.state.ownerName } />
                        </div>
                        <div className="input-container">
                            <label className="label" htmlFor="dogName">Your Dog's Name</label><br/>
                            <input className="inline-element password bb" onChange={this.handleChange} type="text" id="dogName" name="dogName" value={this.state.dogName && this.state.dogName } />
                        </div>
                    </div>
                    <br />
                    <p className="settings-titles">ADDRESS</p>                   

                    <div>
                        <label className="label" htmlFor="street">Street</label><br/>
                        <input className="bb" onChange={this.handleChange} type="text" id="street" name="street" value={this.state.street && this.state.street } />
                    </div>
                    <div className="flex-row-container">

                        <div className="input-container">
                            <label className="label" htmlFor="city">City</label><br/>
                            <input className="password bb" onChange={this.handleChange} type="text" id="city" name="city" value={this.state.city && this.state.city } />
                        </div>
                        <div>
                            <label className="label" htmlFor="state">State</label><br/>
                            <select className="bb" id="state" name="state" onChange={this.handleChange} value={this.state.state && this.state.state }>
                                <option name="state" value="select">...</option>
                                <option name="state" value="CA">CA</option>
                            </select>
                        </div>
                        <div className="zipcode-container">
                            <label className="label" htmlFor="zipcode">Zipcode</label><br/>
                            <input className="bb" onChange={this.handleChange} type="text" id="zipcode" name="zipcode" value={this.state.zipcode && this.state.zipcode } />
                        </div>
                    </div>
                    <br />
                    <div className="submit-button-container">

                        <button id="submit" type="submit">Save</button>
                    </div>
                </form>
            </div>

            </div>
            
        )
    }
}

export default Settings;