import React, { Component } from 'react';
import axios from 'axios';

import UserInfo from '../../components/Profile/UserInfo/UserInfo'
import EditUserInfo from '../../components/Profile/EditUserInfo/EditUserInfo'


class ProfileContainer extends Component {

    state = {
        user: {},
        edit: false,
    }

    componentDidMount = () => {

    }

    getUserInfo = () => {
        let userId = this.props.match.params.name;
        console.log(userId);
        axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            withCredentials: true,
          })
            .then(res => {
              this.setState({
                user: res.data.data,
              });
            })
            .catch(err => console.log(err));

    }


    render () {

        return(
            <>
                <h1>Profile Page</h1>
                <UserInfo />
            </>

        )
    }
}

export default ProfileContainer;