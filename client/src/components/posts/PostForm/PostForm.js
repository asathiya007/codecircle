import React, {useState} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {addPost} from '../../../actions/post';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

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

    return (
        <div className="h-center">
            <div className="w-10 mr4">
                {auth.user && (
                    <Image roundedCircle src={auth.user.avatar} alt="">
                    </Image>
                )}
            </div>
            <div className="w-80 ml2">
                <Form>
                    <Form.Group controlId="formBasicText">
                        <Form.Control type="text" as="textarea" name="text" placeholder={greeting} value={text} onChange={e => setText(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary">Submit</Button>
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
