import React from 'react'; 
import PropTypes from 'prop-types'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'; 

const CreateChat = ({show, handleClose}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

CreateChat.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default CreateChat; 
