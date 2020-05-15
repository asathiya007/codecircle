import React from 'react'
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';

const ChatItem = ({user, chat}) => {

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
        <Jumbotron className="flex pv2 mb1 pl3 p-hover">
            <div className="flex w-20 mr3">
                <div className="cn">
                    {
                        filteredUsers.length < 2 ? (
                            <div className="my-auto">
                                <Image roundedCircle src={filteredUsers[0].avatar}/>
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
        </Jumbotron>
    )
}

ChatItem.propTypes = {
    chat: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
}); 

export default connect(mapStateToProps)(ChatItem); 
