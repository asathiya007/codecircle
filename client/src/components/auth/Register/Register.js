import React, {useState} from 'react'; 
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {setAlert} from '../../../actions/alert';
import {register} from '../../../actions/auth';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Register = ({isAuthenticated, setAlert, register}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password1: ''
    }); 

    const {name, email, password, password1} = formData; 

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value}); 
    }

    const onSubmit = async e => {
        e.preventDefault(); 

        // check if passwords match, if so, register user
        if (password !== password1) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({name, email, password});
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="h-center top-space">
            <div className="w-50">
                <div className="f1 fw7 text-primary">
                    Register
                </div>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="What's your name?" defaultValue={name} onChange={onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="What's your email?" defaultValue={email} onChange={onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Pick a password you'll remember!" defaultValue={password} onChange={onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword1">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="password1" type="password" placeholder="Confirm your password" defaultValue={password1} onChange={onChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired, 
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register); 
