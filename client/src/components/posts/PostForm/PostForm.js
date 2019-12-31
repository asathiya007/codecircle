import React, {useState} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {addPost} from '../../../actions/post';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const PostForm = ({auth, addPost}) => {
    const [text, setText] = useState('');

    // randomized greeting 
    const greetings = [
        'What\'s on your mind?', 
        'How\'s your day been?',
        'Best part of today?',
        'Exciting plans tonight?',
        'Got some big news?'
    ]; 
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];

    const onSubmit = async e => {
        e.preventDefault();
        
        // get value of file input 
        const file = document.querySelector('#fileInput').files; 
        
        // stop submit action if empty text and no file is provided 
        if (!file && text === '') {
            return; 
        }

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

        // add post and reset input fields 
        addPost({text, fileData});
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
                        <Form.Control type="text" as="textarea" name="text" placeholder={greeting} value={text} onChange={e => setText(e.target.value)}/>
                    </Form.Group>
                    <label htmlFor="fileInput" className="btn btn-secondary mb0 mr3">
                        Upload Image <i className="fas fa-image"></i>
                    </label>
                    <input type="file" name="fileInput" id="fileInput" className="btn btn-secondary"/>
                    <Button variant="primary" className="mh3" type="submit">
                        Post
                    </Button>
                </Form>
            </div>
        </div> 
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}); 

export default connect(mapStateToProps, {addPost})(PostForm); 
