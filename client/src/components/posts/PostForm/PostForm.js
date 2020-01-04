import React, {useState} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {addPost} from '../../../actions/post';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {setAlert} from '../../../actions/alert';

const PostForm = ({auth, addPost, setAlert}) => {
    const [text, setText] = useState('');

    // randomized greeting 
    const greetings = [
        'What\'s on your mind?',
        'How\'s your day been?',
        'Best part of today?',
        'Exciting plans tonight?',
        'Got some big news?',
        'Anything cool to share?'
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];

    const disaleInputs = () => {
        if (document.querySelector('#fileInput')) {
            document.querySelector('#fileInput').setAttribute('disabled', true);
        }
        if (document.querySelector('#textInput')) {
            document.querySelector('#textInput').setAttribute('disabled', true);
        }
        if (document.querySelector('#postButton')) {
            document.querySelector('#postButton').setAttribute('disabled', true);
            document.querySelector('#postButton').textContent = 'Posting...';
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
        if (document.querySelector('#postButton')) {
            document.querySelector('#postButton').removeAttribute('disabled');
            document.querySelector('#postButton').textContent = 'Post';
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

            disaleInputs();

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

            // add post, reset input fields
            addPost({ text, fileData });
            setText('');
            document.querySelector('#fileInput').value = '';
        } catch (error) {
            if (error.response && error.response.status === 503) {
                setAlert('Unable to upload image/video file, please provide smaller file', 'danger'); 
            } else {
                setAlert('Unable to make post, please try again later', 'danger'); 
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
                        <Form.Control type="text" as="textarea" name="text" id="textInput" placeholder={greeting} value={text} onChange={e => setText(e.target.value)}/>
                    </Form.Group>
                    <label htmlFor="fileInput" className="btn btn-secondary mb0 mr3">
                        <i className="fas fa-image"></i> Upload Image/Video 
                    </label>
                    <input type="file" name="fileInput" id="fileInput" className="btn btn-secondary"/>
                    <Button variant="primary" className="mh1" type="submit" id="postButton">
                        Post
                    </Button>
                </Form>
            </div>
        </div> 
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired, 
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth 
}); 

export default connect(mapStateToProps, {addPost, setAlert})(PostForm); 
