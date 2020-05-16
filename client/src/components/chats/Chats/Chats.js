import React, {useEffect} from 'react'; 
import socketIOClient from "socket.io-client";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; 
import {getChats} from '../../../actions/chat';
import Spinner from '../../layout/Spinner/Spinner';
import ChatsList from '../ChatsList/ChatsList';

const Chats = ({user, chats, getChats}) => {
    useEffect(() => {
        if (user) {
            try {
                const socket = socketIOClient(process.env.PORT, { query: `user=${user._id}` });
                socket.on("chat message", (data) => {
                    console.log(data);
                });
            } catch (error) {
                console.log("CircleChat is temporarily unavailable");
            }

            try {
                getChats(); 
            } catch (error) {
                console.log("Cannot get chats data, please try again later"); 
            }
        }
    }, [user, getChats]); 

    return !user || chats?.loading ? <Spinner/> : (
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    CircleChat
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-comments"></i>
                    {' '}Chat with other brilliant coders in the CodeCircle community!
                </p>
                <div className="flex justify-center">
                    <ChatsList chats={chats.chats}/>
                    <div className="w-70 tc v-mid">
                        Welcome to Chat!
                    </div>
                </div>
            </div>
        </div>
    )
}

Chats.propTypes = {
    user: PropTypes.object,
    getChats: PropTypes.func.isRequired,
    chats: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
    chats: state.chat
}); 

export default connect(mapStateToProps, {getChats})(Chats); 
