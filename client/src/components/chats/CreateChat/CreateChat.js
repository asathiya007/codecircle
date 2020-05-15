import React, {useEffect, useState} from 'react'; 
import PropTypes from 'prop-types'; 
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import {getUsers} from '../../../actions/users';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

const CreateChat = ({show, handleClose, getUsers, users}) => {
    useEffect(() => {
        getUsers(); 
    }, [getUsers]); 

    const [formData, setFormData] = useState({
        selected: [], 
        message: ''
    });

    const chooseUser = (idx) => {
        const {selected} = formData; 
        if (selected.includes(idx)) {
            setFormData({
                ...formData,
                selected: selected.filter(i => i !== idx)
            });
        } else {
            setFormData({
                ...formData,
                selected: selected.concat(idx)
            });
        }
    }

    const makeChat = () => {
        console.log('Members: ', formData.selected);
        console.log('Message: ', formData.message); 
    }

    return (
        <div>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton className="mb0">
                    <p className="f3 fw6 mb0">Create Chat</p>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p className="f5 mb0 pb0">Select chat members:</p>
                        <div className="w-100 select-users pv2 ph2 ba bw1 br2">
                            <ListGroup>
                                {
                                    users.map((user, i) => {
                                        if (formData.selected.includes(i)) {
                                            return (
                                                <ListGroup.Item key={i} onClick={e => chooseUser(i)}>
                                                    <div className="flex">
                                                        <div className="w-10">
                                                            <Image roundedCircle src={user.avatar} />
                                                        </div>
                                                        <p className="mv0 pv0 f5 my-auto ml3 b">{user.name}</p>
                                                    </div>
                                                </ListGroup.Item>
                                            )
                                        }

                                        return (
                                            <ListGroup.Item key={i} onClick={e => chooseUser(i)}>
                                                <div className="flex">
                                                    <div className="w-10">
                                                        <Image roundedCircle src={user.avatar} />
                                                    </div>
                                                    <p className="mv0 pv0 f5 my-auto ml3">{user.name}</p>
                                                </div>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </div>
                    </div>
                    <div className="mt2">
                        <Form>
                            <p className="f5 mb0 pb0">Greeting:</p>
                            <Form.Control type="email" placeholder="Greet your new chat members!" defaultValue={formData.message} onChange={e => {
                                setFormData({
                                    ...formData, 
                                    message: e.target.value
                                });
                            }}/>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={makeChat}>
                        Create Chat
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

CreateChat.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    users: state.users.users
}); 

export default connect(mapStateToProps, {getUsers})(CreateChat); 
