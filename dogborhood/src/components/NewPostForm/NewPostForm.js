import React, {Component} from 'react';
import axios from 'axios';

import './NewPostForm.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class NewPostForm extends Component {
    state = {

    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        
      };

    render () {

        return (
            <>
            {/* <div className="modal"> */}
            <Modal show={this.props.showNewPostForm} onHide={this.props.handlePostFormOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
            {/* </div> */}

            </>
        )
    }
}

export default NewPostForm;