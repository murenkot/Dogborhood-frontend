import React from 'react';

const Post = (props) => {
    return(
        <>
            <h3>{props.post.title}</h3>
            <p>{props.post.body}</p>
        </>
    )
}

export default Post;