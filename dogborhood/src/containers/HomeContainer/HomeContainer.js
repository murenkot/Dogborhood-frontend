import React, { Component } from 'react';
import axios from 'axios';

import AuthContainer from '../AuthContainer/AuthContainer';
import MainMap from '../../components/MainMap/MainMap';
import Post from '../../components/Post/Post';

import './HomeContainer.css';

class Home extends Component {


  state = {
    user: null,
    posts: [],
    users: [],
  }

  componentDidMount = () =>{

    if (localStorage.getItem('uid')) {
      console.log("++++++ "+localStorage.getItem('uid'))
      this.getUserInfo()
    }
  }

//   componentDidUpdate = () => {
//     console.log("test");
//     if (this.state.user && this.props.match.url.split('/')[2] !== this.state.user._id) {
//         this.getUserInfo();
//         this.getUserPosts();;
//     }
// }

  test = () => {
    console.log("++++++"+localStorage.getItem('uid'))
    return (
      <p>You are logged in!</p>
    )
  }

  getUserInfo = () => {
    let userId = localStorage.getItem('uid')
    console.log(userId);

    axios.get(`${process.env.REACT_APP_API_URL}/users/byId/${userId}`, {
        withCredentials: true,
      })
        .then(res => {
            console.log(res);
          this.setState({
            user: res.data.data,
          });
        })
        .then(this.getAllUsersInfo)
        .catch(err => console.log(err));
};

  getAllUsersInfo = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        withCredentials: true,
      })
        .then(res => {
            console.log(res);
          this.setState({
            users: res.data.data,
          }, ()=>{console.log(this.state.users)});
        })
        .then(this.getAllPosts)
        .catch(err => console.log(err));
  };

  getAllPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
      withCredentials: true,
    })
      .then(res => {
          console.log(res);
        this.setState({
          posts: res.data.data,
        }, ()=>{console.log(this.state.users)});
      })
      .then()
      .catch(err => console.log(err));
  }

  refreshPage = () => {
    window.location.reload(false);
  }

  render () {

   
    return (
      <div className="container">
        {localStorage.getItem('uid') &&  this.getUserInfo}
        {localStorage.getItem('uid') &&  this.getAllUsersInfo}
        {localStorage.getItem('uid') &&  this.getAllPosts}


        {/* <h1>Home</h1> */}
        {localStorage.getItem('uid') ? 
        // <p>hi</p> :
        this.state.user && 
        <>
          <div className="flex-row-container wide">
            <div className="main-posts-container">
              {this.state.posts.map(post => <Post currentUser={this.props.currentUser} post={post} />)}
            </div>

            <div className="main-map-container">
              <MainMap users={this.state.users} center_lat={this.state.user.lat} center_lng={this.state.user.lng} isMarkerShown/>
            </div>
          </div>

        </>
        :
        <AuthContainer refreshPage={this.refreshPage} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} />}
     </div>
    )
  }
  
};

export default Home;
