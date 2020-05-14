import React from 'react'; 
import PropTypes from 'prop-types'; 
import ChatItem from '../ChatItem/ChatItem';

const ChatsList = ({chats}) => {
    return (
        <div className="w-30">
            <div>
                {/* Display user profile pic, Chats, and a button to create */}
            </div>
            <div>
                {chats.map((chat, i) => (
                    <ChatItem key={i} chat={chat} />
                ))}
            </div>
        </div>
    )
}

ChatsList.propTypes = {
    chats: PropTypes.array.isRequired
}

export default ChatsList; 
