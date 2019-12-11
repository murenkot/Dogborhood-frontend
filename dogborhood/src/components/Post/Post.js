import React, { Component } from 'react';
import Timestamp from 'react-timestamp';

import EditPostForm from '../EditPostForm/EditPostForm';

import './Post.css';

class Post extends Component {

    state = {
        post: '',
        showEditPostForm: false,
    }

    // handleSubmit = (e, postId, body) => {
    //     console.log("Updating post: "+ postId);
    //     e.preventDefault();
    //     axios.put(`${process.env.REACT_APP_API_URL}/posts/${this.ptops.post._id}`, 
    //     body, {
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         console.log(res.data.data)
    //         // this.props.updatePostsList(res.data.data);
    //         this.props.handlePostFormOpen();
    //     })
    //     .catch((error) => console.log(error));
    // }
    
    componentDidMount = () => {
        this.props.post && this.setState({
            post: this.props.post,
        })
    }

    handleEditPostFormOpen = () => {
        this.setState((prevState) => {
            return {
                showEditPostForm: !prevState.showEditPostForm
            }
        });
    }

    addEditDeleteButton = () => {
        return (
            <>
                <div class="dropdown-edit">
                    <button class="dropbtn">...</button>
                    <div class="dropdown-content">
                        <p onClick={()=>this.handleEditPostFormOpen(this.props.post)}>Edit Post</p>
                        <p onClick={()=>this.props.deletePost(this.props.post._id)}>Delete Post</p>
                    </div>
                </div>
            </>
        )
    }

    refreshPage = () => {
        window.location.reload(false);
      }

    updatePostData = (updatedPost) => {
        this.setState({
            post: updatedPost,
        })
    }
    

    render () {

        return(
            <>
                {this.state.showEditPostForm && <EditPostForm post={this.props.post} updatePostData={this.updatePostData} handleSubmit={this.state.handleSubmit}  handleEditPostFormOpen={this.handleEditPostFormOpen} showEditPostForm={this.state.showEditPostForm}/>}

                <div className="post-container-x">
                    <div className="flex-row-container">
                        <div className="post-header-container">
                            <div className="flex-row-container">
                                <div className="post-header-photo-container">
                                    <img id="avatar" src={this.props.post.author.avatar} />
                                </div>
                                <div className="post-header-text-container">
                                    <h5>{this.state.post.title}</h5>
                                    <p><a href={"/user/"+this.props.post.author._id}>{this.props.post.author.ownerName}</a> <Timestamp relative date={this.props.post.timeStamp} /> </p>

                                </div>

                            </div>

                        </div>
                        {localStorage.getItem('uid') === this.props.post.author._id && this.addEditDeleteButton()}
                    
                    </div>
                    <div className="post-body-container">
                        <hr />

                        <p>{this.state.post.body}</p>
                    </div>

                    
                </div>
            </>
            )
    }
}

export default Post;