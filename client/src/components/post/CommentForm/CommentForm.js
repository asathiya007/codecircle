import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { setAlert } from '../../../actions/alert';

const CommentForm = ({ post, auth, addComment, setAlert }) => {
    const [text, setText] = useState('');

    // randomized greeting 
    const greetings = [
        'What\'s on your mind?',
        'Care to comment?',
        'What do you think?',
        'Thoughts?',
        'Join the discussion!'
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];

    const onSubmit = async e => {
        e.preventDefault();

        // get value of file input 
        const file = document.querySelector('#fileInput').files;

        // if user provided file, upload file to server and get file data
        let fileData = null;
        if (file[0]) {
            fileData = new FormData();
            fileData.append('file', file[0]);
            const res = await axios.post('/uploads', fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fileData = res.data;
        }

        // stop submit action if empty text and no file is provided 
        if ((!fileData || fileData === {}) && (!text || text === '')) {
            setAlert('Please provide text and/or an image to post', 'danger');
            return;
        }

        // add comment and reset input fields 
        addComment(post._id, { text, fileData });
        setText('');
        document.querySelector('#fileInput').value = '';
    }

    return (
        <div className="h-center">
            <div className="w-12 mr4">
                {auth.user && (
                    <Image roundedCircle src={auth.user.avatar} alt="">
                    </Image>
                )}
            </div>
            <div className="w-80 ml2">
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicText">
                        <Form.Control type="text" as="textarea" name="text" placeholder={greeting} value={text} onChange={e => setText(e.target.value)} />
                    </Form.Group>
                    <label htmlFor="fileInput" className="btn btn-secondary mb0 mr3">
                        <i className="fas fa-image"></i> Upload Image
                    </label>
                    <input type="file" name="fileInput" id="fileInput" className="btn btn-secondary" />
                    <Button variant="primary" className="mh1" type="submit">
                        Comment
                    </Button>
                </Form>
            </div>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired, 
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addComment, setAlert })(CommentForm); 
