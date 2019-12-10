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
        posts: null,
        edit: false,
        geocoder: null,
        map: null,
        showNewPostForm: false,
    }

    componentDidMount = () => {
        this.getUserInfo();
        this.getUserPosts();
    }

    componentDidUpdate = () => {
        if (this.state.user && this.props.match.url.split('/')[2] !== this.state.user._id) {
            this.getUserInfo();
            this.getUserPosts();;
        }
    }


  
    getUserInfo = () => {
        let url = this.props.match.url;
        let userId = url.split('/')[2];

        axios.get(`${process.env.REACT_APP_API_URL}/users/byId/${userId}`, {
            withCredentials: true,
          })
            .then(res => {
                console.log(res);
              this.setState({
                user: res.data.data,
              });
            })
            .catch(err => console.log(err)) ;
    };

    getUserPosts = () => {
        let url = this.props.match.url;
        let userId = url.split('/')[2];
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${userId}`, {
          withCredentials: true,
        })
          .then(res => {
              console.log(res);
            this.setState({
              posts: res.data.data,
            }, ()=>{console.log(this.state.posts)});
          })
          .catch(err => console.log(err));
      }
    

    handlePostFormOpen = () => {
        this.setState((prevState) => {
            return {
                showNewPostForm: !prevState.showNewPostForm
            }
        });
        // this.props.refreshPage();
    };

    updatePostsList = (post) => {
        console.log("updatePostsList is running");
        console.log(post);
        this.setState({
            posts: this.state.user.posts.concat(post)
        });
    }

    showPersonalButtons = () => {
        // console.log(this.props.currentUser);
        // console.log(localStorage.getItem('uid'));
        // console.log(this.state.user._id);
        if (localStorage.getItem('uid') === this.state.user._id) {
            return (
                <>
                    <img src={plus} onClick={this.handlePostFormOpen}/>
                    <img src={pencil} onClick={()=> this.props.history.push('/settings')}/>
                </>
            )
        }
        
    }

    deletePost = (postId) => {
        console.log("ID of deleted post: "+ postId);
        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
            withCredentials: true,
          })
            .then(res => {
                console.log(res.data.data);
              this.setState({
                posts: this.state.posts.filter((post)=>{return post._id !== postId} ),
              });
            })
            .catch(err => console.log(err)) ;
    }

    refreshPage = () => {
        document.location.reload();
    }

    render () {


        return(
            <>
            {this.props.currentUser && console.log(this.props.currentUser)}
                <div className="profile-buttons-container">
                    { this.state.user && this.showPersonalButtons()}
                    {/* <img src={plus} onClick={this.handlePostFormOpen}/>
                    <img src={pencil} onClick={()=> this.props.history.push('/settings')}/> */}
                </div>
                {this.state.showNewPostForm && <NewPostForm updatePostsList={this.updatePostsList} handlePostFormOpen={this.handlePostFormOpen} showNewPostForm={this.state.showNewPostForm}/>}

                {this.state.user && <UserInfo userInfo={this.state.user} />}
                <div className="maps-container">
                    {this.state.user && <UserMapComponent lat={this.state.user.lat} lng={this.state.user.lng} isMarkerShown/>}
                </div>
                <div className="post-container">
                    {this.state.posts && this.state.posts.map(post => <Post currentUser={this.props.currentUser} key={post._id} deletePost={this.deletePost} post={post}/>)}
                </div>
            </>

        )
    }
}

export default ProfileContainer;