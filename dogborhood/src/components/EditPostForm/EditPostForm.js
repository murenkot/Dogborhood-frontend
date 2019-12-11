import React, {Component} from 'react';
import axios from 'axios';
import PickyDateTime from 'react-picky-date-time';
import DateTimePicker from 'react-datetime-picker';

import '../NewPostForm/NewPostForm.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class EditPostForm extends Component {
    state = {
        title: '',
        body: '',
        endTime: '',
        startTime: new Date(),

    }

    componentDidMount = () => {
        this.props.post && this.setState({
            title: this.props.post.title,
            body: this.props.post.body,
            startTime: this.props.post.startTime,
        })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        
      };
    
    onChange = startTime => this.setState({ startTime })

    
    handleEditPostSubmit = (e) => {
            console.log("Updating post: "+ this.props.post._id);
            e.preventDefault();
            axios.put(`${process.env.REACT_APP_API_URL}/posts/${this.props.post._id}`, 
            this.state, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data.data)
                // this.props.updatePostsList(res.data.data);
                this.props.updatePostData(res.data.data);
                this.props.handleEditPostFormOpen();
               
            })
            .catch((error) => console.log(error));

    }

    render () {


        return (
            <>
            {/* <div className="modal"> */}
            <Modal className="modal-new-form" animation="true" show={this.props.showEditPostForm} onHide={this.props.handleEditPostFormOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit yout post</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <div className="modal-new-form">

                    <div>
                        <label htmlFor="title">Title</label><br/>
                        <input onChange={this.handleChange} type="text" id="title" name="title" value={this.state.title} />
                    </div>
                    <div>
                        <label htmlFor="body">Description</label><br/>
                        <textarea onChange={this.handleChange} type="textarea" id="body" name="body" value={this.state.body}  /><br/>
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
                    <Button onClick={this.props.handleEditPostFormOpen} variant="secondary">Close</Button>
                    <Button onClick={this.handleEditPostSubmit} variant="primary">Publish</Button>
                </Modal.Footer>
            </Modal>
            {/* </div> */}

            </>
        )
    }
}

export default EditPostForm;