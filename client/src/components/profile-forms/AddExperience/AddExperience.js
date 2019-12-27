import React, {useState} from 'react'; 
import PropTypes from 'prop-types'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addExperience} from '../../../actions/profile';

const AddExperience = ({auth, addExperience, history}) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false, 
        description: ''
    }); 

    const onChange = e => {
        if (e.target.name === 'current') {
            // toggle the 'current' field
            setFormData({...formData, [e.target.name]: !formData.current});
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const onSubmit = e => {
        e.preventDefault(); 
        addExperience(formData, history);
    }

    return (auth.user && 
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Add Experience
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-briefcase"></i>
                    {' '}Hey {auth.user.name.split(' ')[0]}, tell us about your work experience!
                </p>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title (Required)</Form.Label>
                        <Form.Control type="text" placeholder="What is/was your job title?" name="title" onChange={onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label>Company (Required)</Form.Label>
                        <Form.Control type="text" placeholder="What company did you work at?" name="company" onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Where did you work?" name="location" onChange={onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicFrom">
                        <Form.Label>From (Required)</Form.Label>
                        <Form.Control type="date" placeholder="When did you start studying here?" name="from" onChange={onChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicCurrent">
                        <Form.Check type="checkbox" label="Current" name="current" onChange={onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicTo">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="date" placeholder="When did you finish studying here?" name="to" onChange={onChange}disabled={formData.current} required={!formData.current}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" as="textarea" name="description" placeholder="Any more details you'd like t share about your studies here?" onChange={onChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    <Button variant="secondary" onClick={e => {
                        e.preventDefault(); 
                        history.push('/dashboard');
                    }} className="ml3">
                        Go Back
                    </Button>
                </Form>
            </div>
        </div>
    )
}

AddExperience.propTypes = {
    auth: PropTypes.object.isRequired, 
    addExperience: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}); 

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience)); 
