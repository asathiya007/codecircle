import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { setAlert } from '../../../actions/alert';
import {withRouter} from 'react-router-dom';

const CommentForm = ({ post, auth, addComment, setAlert, greeting, history}) => {
    const [text, setText] = useState('');

    const disableInputs = () => {
        if (document.querySelector('#fileInput')) {
            document.querySelector('#fileInput').setAttribute('disabled', true);
        }
        if (document.querySelector('#textInput')) {
            document.querySelector('#textInput').setAttribute('disabled', true);
        }
        if (document.querySelector('#commentButton')) {
            document.querySelector('#commentButton').setAttribute('disabled', true);
            document.querySelector('#commentButton').textContent = 'Commenting...';
        }
        if (document.querySelector('#backButton')) {
            document.querySelector('#backButton').setAttribute('disabled', true);
        }
    }

    const enableInputs = () => {
        if (document.querySelector('#fileInput')) {
            document.querySelector('#fileInput').value = '';
            document.querySelector('#fileInput').removeAttribute('disabled');
        }
        if (document.querySelector('#textInput')) {
            document.querySelector('#textInput').removeAttribute('disabled');
        }
        if (document.querySelector('#commentButton')) {
            document.querySelector('#commentButton').removeAttribute('disabled');
            document.querySelector('#commentButton').textContent = 'Post';
        }
        if (document.querySelector('#backButton')) {
            document.querySelector('#backButton').removeAttribute('disabled');
        }
    }

    const onSubmit = async e => {
        e.preventDefault();

        try {
            // get value of file input 
            const file = document.querySelector('#fileInput').files;

            // stop submit action if empty text and no file is provided 
            if ((!file || file === {}) && (!text || text === '')) {
                setAlert('Please provide text or an image/video to post', 'danger');
                return;
            }

            disableInputs();

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

            // add comment and reset input fields 
            addComment(post._id, { text, fileData });
            setText('');
            document.querySelector('#fileInput').value = '';
        } catch (error) {
            if (error.response && error.response.status === 503) {
                setAlert('Unable to upload image/video file, please provide smaller image/video file', 'danger');
            } else {
                setAlert('Unable to make comment, please try again later', 'danger');
            }
        } 
        enableInputs(); 
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
                    <Form.Group>
                        <Form.Control type="text" as="textarea" name="text" id="textInput" placeholder={greeting} value={text} onChange={e => setText(e.target.value)} />
                    </Form.Group>
                    <label htmlFor="fileInput" className="btn btn-secondary mb0 mr1">
                        <i className="fas fa-image"></i> Upload Image/Video
                        </label>
                    <input type="file" name="fileInput" id="fileInput" className="btn btn-secondary" />
                    <Button variant="primary" className="mh1" type="submit" id="commentButton">
                        Comment
                    </Button>
                    <Button variant="secondary" className="mh1 button-margins-1" onClick={e => {
                        e.preventDefault(); 
                        history.goBack(); 
                    }} id="backButton">
                        Back to Posts
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

export default connect(mapStateToProps, { addComment, setAlert })(withRouter(CommentForm)); 
