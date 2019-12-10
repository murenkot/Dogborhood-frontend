import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserInfo.css';

const UserInfo = (props) => {

    return (
      <div className="user-details">
        <div className="flex-row-container">
          <div className="userInfo">
            <div className="cell">
              <h3>{props.userInfo.ownerName} & {props.userInfo.dogName}</h3>
              <p>{props.userInfo.city}</p>
              <p>{props.userInfo.zipcode}</p>
            </div>
          </div>
         
          <div className="avatar-container">
            <img id="avatar" src={props.userInfo.avatar} alt="avatar"></img>
          </div>
        </div>
       
        {/* <Button id="edit" name="edit-profile" onClick={props.editMode} variant="outline-secondary">Edit</Button> */}
      </div>
    )
  }

export default UserInfo;