import React, {useState} from 'react'; 
import PropTypes from 'prop-types'; 
import ChatItem from '../ChatItem/ChatItem';
import {connect} from 'react-redux';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CreateChat from '../CreateChat/CreateChat';

const ChatsList = ({chats, user}) => {

    // for modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return chats && (
        <div className="w-30">
            <div className="flex justify-between">
                <div className="flex">
                    <div className="w-20 cn">
                        <Image roundedCircle src={user.avatar} />
                    </div>
                    <p className="my-auto f2 fw7 ml3">
                        Chats
                    </p>
                </div>
                <div className="my-auto">
                    <Button variant="primary" onClick={handleShow}>
                        <i className="fas fa-plus"></i>
                    </Button>
                </div>
            </div>
            <hr/>
            <div>
                {chats.map((chat, i) => (
                    <ChatItem key={i} chat={chat} />
                ))}
            </div>

            <CreateChat show={show} handleClose={handleClose}/>
        </div>
    )
}

ChatsList.propTypes = {
    chats: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
}); 

export default connect(mapStateToProps)(ChatsList); 
