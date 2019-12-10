import React from 'react';

import './Post.css';

const Post = (props) => {

    const addEditDeleteButton = () => {
        return (
            <>
                {/* <button onClick={()=>props.editPost(props.post._id)}> Edit </button>
                <button onClick={()=>props.deletePost(props.post._id)} >Delete</button> */}
                <div class="dropdown-edit">
                    <button class="dropbtn">...</button>
                    <div class="dropdown-content">
                        <p onClick={()=>props.editPost(props.post._id)}>Edit Post</p>
                        <p onClick={()=>props.deletePost(props.post._id)}>Delete Post</p>
                    </div>
                    </div>
            </>
        )
    }
    return(
        <>
            <div className="post-container-x">
                <div className="flex-row-container">
                    <div className="post-header-container">
                        <div className="flex-row-container">
                            <div className="post-header-photo-container">
                                <img id="avatar" src={props.post.author.avatar} />
                            </div>
                            <div className="post-header-text-container">
                                <h3>{props.post.title}</h3>
                                <p>{props.post.author.ownerName}</p>
                            </div>

                        </div>

                    </div>
                    {localStorage.getItem('uid') === props.post.author._id && addEditDeleteButton()}
                
                </div>
                <div className="post-body-container">
                    <p>{props.post.body}</p>
                </div>

                
            </div>
        </>
    )
}

export default Post;