import React, {useState} from 'react'; 
import PropTypes from 'prop-types'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';

const AddEducation = ({auth}) => {
    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false, 
        description: ''
    }); 

    const onChange = e => {
        if (e.target.name === 'current') {
            setFormData({...formData, [e.target.name]: !formData.current});
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    return (auth.user && 
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Add Education
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-graduation-cap"></i>
                    {' '}Hey {auth.user.name.split(' ')[0]}, tell us about your studies!
                </p>

                <Form>
                    <Form.Group controlId="formBasicInstitution">
                        <Form.Label>Institution (Required)</Form.Label>
                        <Form.Control type="text" placeholder="Where did you study?" name="institution" onChange={onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicDegree">
                        <Form.Label>Degree (Required)</Form.Label>
                        <Form.Control type="text" placeholder="What degree did you work towards?" name="degree" onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicFieldOfStudy">
                        <Form.Label>Field of Study (Required)</Form.Label>
                        <Form.Control type="text" placeholder="What did you study?" name="fieldOfStudy" onChange={onChange}/>
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

AddEducation.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}); 

export default connect(mapStateToProps)(AddEducation); 
