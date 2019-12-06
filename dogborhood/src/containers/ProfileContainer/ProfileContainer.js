import React, { Component } from 'react';
import UserMapComponent from '../../components/UserMapComponent/UserMapComponent';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

import './ProfileContainer.css';
import UserInfo from '../../components/UserInfo/UserInfo';
import NewPostForm from '../../components/NewPostForm/NewPostForm';
import Post from '../../components/Post/Post';

import plus from '../../img/plus-solid.svg';
import pencil from '../../img/pencil-alt-solid.svg';

class ProfileContainer extends Component {

    state = {
        user: null,
        edit: false,
        geocoder: null,
        map: null,
        showNewPostForm: false,

    }

    componentDidMount = () => {
        this.getUserInfo();
    }
  
    getUserInfo = () => {
        let url = this.props.match.url;
        let userId = url.split('/')[2];
        console.log(url);
        console.log(userId);

        axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            withCredentials: true,
          })
            .then(res => {
                console.log(res);
              this.setState({
                user: res.data.data,
              }, ()=>{console.log(this.state.user.coordinates)});
            })
            .catch(err => console.log(err));
    };

    handlePostFormOpen = () => {
        this.setState((prevState) => {
            return {
                showNewPostForm: !prevState.showNewPostForm
            }
        });
        console.log('lahseiufbh')
        // this.props.refreshPage();
    };

    render () {


        return(
            <>
                <div className="profile-buttons-container">
                {/* <i class="fas fa-pencil-alt fa-2x"></i> */}
                    <img src={plus} onClick={this.handlePostFormOpen}/>
                    <img src={pencil} onClick={()=> this.props.history.push('/settings')}/>
                </div>
                {this.state.showNewPostForm && <NewPostForm handlePostFormOpen={this.handlePostFormOpen} showNewPostForm={this.state.showNewPostForm}/>}


                {this.state.user && <UserInfo userInfo={this.state.user} />}
                <div className="maps-container">
                    {this.state.user && <UserMapComponent coordinates={this.state.user.coordinates} isMarkerShown/>}
                </div>
                <div className="post-container">
                    {this.state.user && this.state.user.posts.map(post => <Post post={post}/>)}
                </div>

            </>

        )
    }
}

export default ProfileContainer;