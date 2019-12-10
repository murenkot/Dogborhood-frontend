import React, {Component} from 'react';
import axios from 'axios';
import PickyDateTime from 'react-picky-date-time';
import DateTimePicker from 'react-datetime-picker';

import './NewPostForm.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class NewPostForm extends Component {
    state = {
        title: '',
        body: '',
        endTime: '',
        startTime: new Date(),

    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        
      };
    
    onChange = startTime => this.setState({ startTime })


    handleNewPostSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/posts/new`,
        this.state, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data.data)
            this.props.updatePostsList(res.data.data);
            this.props.handlePostFormOpen();
        })
        .catch((error) => console.log(error));
    }

    render () {


        return (
            <>
            {/* <div className="modal"> */}
            <Modal className="modal-new-form" animation="true" show={this.props.showNewPostForm} onHide={this.props.handlePostFormOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new post</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <div className="modal-new-form">

                    <div>
                        <label htmlFor="title">Title</label><br/>
                        <input onChange={this.handleChange} type="text" id="title" name="title" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="body">Description</label><br/>
                        <textarea onChange={this.handleChange} type="textarea" id="body" name="body" placeholder="" /><br/>
                    </div>
                    <div>
                        <DateTimePicker
                                name ="startTime"
                                onChange={this.onChange}
                                value={this.state.startTime}
                        />
                    </div>
                </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button onClick={this.handleNewPostSubmit} variant="primary">Publish</Button>
                </Modal.Footer>
            </Modal>
            {/* </div> */}

            </>
        )
    }
}

export default NewPostForm;