import React from 'react'
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import {leaveChat} from '../../../actions/chat';

const ChatItem = ({user, chat, leaveChat}) => {

    const filteredUsers = chat.users.filter(member => String(member._id) !== String(user._id)); 
    let label = '';
    if (filteredUsers.length > 2) {
        label += filteredUsers[0].name + ', ' + filteredUsers[1].name
            + `, and ${filteredUsers.length - 2} others`; 
    } else {
        filteredUsers.map((user, i) => {
            if (i === filteredUsers.length - 1) {
                return label += user.name; 
            }
            return label += user.name + ', '; 
        }); 
    }
    
    return (
        <Jumbotron className="flex justify-between pv2 mb1 pl3 pr3 p-hover">
            <div className="flex">
                <div className="flex w-20 mr3">
                    <div className="cn">
                        {
                            filteredUsers.length < 2 ? (
                                <div className="my-auto">
                                    <Image roundedCircle src={filteredUsers[0].avatar} />
                                </div>
                            ) : (
                                    <div>
                                        <div className="image-stack">
                                            <div className="image-stack__item image-stack__item--top">
                                                <Image roundedCircle src={filteredUsers[0].avatar} className="w-80 ba bw1 b--light-gray" />
                                            </div>
                                            <div className="image-stack__item image-stack__item--bottom">
                                                <Image roundedCircle src={filteredUsers[0].avatar} className="w-60" />
                                            </div>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <p className="my-auto v-mid f6">
                    {label}
                </p>
            </div>
            <div>
                <Button variant="danger" className="mr0" onClick={e => {
                    e.preventDefault(); 
                    leaveChat(chat._id);
                }}>
                    <i className="fas fa-times"></i>
                </Button>
            </div>
        </Jumbotron>
    )
}

ChatItem.propTypes = {
    chat: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    leaveChat: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
}); 

export default connect(mapStateToProps, {leaveChat})(ChatItem); 
