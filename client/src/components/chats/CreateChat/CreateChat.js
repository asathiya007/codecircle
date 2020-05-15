import React, {useEffect, useState} from 'react'; 
import PropTypes from 'prop-types'; 
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import {getUsers} from '../../../actions/users';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import {createChat} from '../../../actions/chat';
import {setAlert} from '../../../actions/alert';

const CreateChat = ({user, show, handleClose, getUsers, users, createChat, setAlert}) => {
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

        // input validation 
        if (formData.selected.length === 0 || formData.message === '') {
            alert('Please provide complete input to create chat');
            return; 
        }

        const selUsers = [];
        selUsers.push({
            _id: user._id, 
            name: user.name,
            avatar: user.avatar
        }); 
        for (const i in formData.selected) {
            selUsers.push(users[i]);
        }
        const data = {
            user,
            users: selUsers, 
            text: formData.message
        };
        createChat(data);
        onClose(); 
    }

    const onClose = () => {
        setFormData({
          selected: [],
          message: '',
        });
        handleClose(); 
    }

    return (
        <div>
            <Modal show={show} onHide={onClose}>
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
                                              <ListGroup.Item
                                                className="bg-light"
                                                key={i}
                                                onClick={(e) => chooseUser(i)}
                                              >
                                                <div className="flex">
                                                  <div className="w-10">
                                                    <Image
                                                      roundedCircle
                                                      src={user.avatar}
                                                    />
                                                  </div>
                                                  <p className="mv0 pv0 f5 my-auto ml3 b">
                                                    {user.name}
                                                  </p>
                                                </div>
                                              </ListGroup.Item>
                                            );
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
                        <Form onSubmit={e => {
                                e.preventDefault(); 
                                makeChat();
                            }}>
                            <p className="f5 mb0 pb0">Greeting:</p>
                            <Form.Control type="text" placeholder="Greet your new chat members!" defaultValue={formData.message} onChange={e => {
                                setFormData({
                                    ...formData, 
                                    message: e.target.value
                                });
                            }}/>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
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
    users: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    users: state.users.users,
    user: state.auth.user
}); 

export default connect(mapStateToProps, {getUsers, createChat, setAlert})(CreateChat); 
