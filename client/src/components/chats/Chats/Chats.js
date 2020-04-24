import React, {useEffect} from 'react'; 
import socketIOClient from "socket.io-client";
// import PropTypes from 'prop-types'; 

const Chats = props => {
    useEffect(() => {
        try {
          const socket = socketIOClient(process.env.PORT);
          socket.on("chat message", (data) => {
            console.log(data);
          });
        } catch (error) {
          console.log("Connecting to socket...");
        }
    }, []); 

    return (
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    In Progress
                </p>
                <p className="f3 fw4">
                    <i class="fas fa-tools"></i>
                    {' '}This feature is currently in development, come back soon!
                </p>
            </div>
        </div>
    )
}

// Chats.propTypes = {

// }

export default Chats; 
