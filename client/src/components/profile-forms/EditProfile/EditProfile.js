import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner/Spinner';
import { buildProfile } from '../../../actions/profile';
import { withRouter } from 'react-router-dom';
import {getProfile} from '../../../actions/profile';

const EditProfile = ({ auth, profile: {profile, loading}, buildProfile, getProfile, history }) => {

    const [displaySocial, toggleSocial] = useState(false);

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        name: '',
        phone: '',
        email: '',
        occupation: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '', 
        pinterest: ''
    });

    const {
        company,
        website,
        location,
        phone,
        occupation,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram, 
        pinterest
    } = formData;

    const [fetchedProfileData, toggleFetchProfData] = useState(false);

    useEffect(() => {
        if (!profile) {
            getProfile();
            toggleFetchProfData(true);
        }
         
        if (profile) {
            setFormData({
                company: loading || !profile.company ? '' : profile.company,
                website: loading || !profile.website ? '' : profile.website,
                location: loading || !profile.location ? '' : profile.location,
                phone: loading || !profile.phone ? '' : profile.phone,
                occupation: loading || !profile.occupation ? '' : profile.occupation,
                skills: loading || !profile.skills ? '' : profile.skills,
                githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
                bio: loading || !profile.bio ? '' : profile.bio,
                twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
                facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
                linkedin: loading || !profile.social.linkedin ? '' : profile.social.linkedin,
                youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
                instagram: loading || !profile.social.instagram ? '' : profile.social.instagram, 
                pinterest: loading || !profile.social.pinterest ? '' : profile.social.pinterest
            });
        }
    }, [profile, loading, fetchedProfileData, getProfile]); 

    // only accept numbers as input for the user's phone number
    const fitPhoneNum = phoneNum => {
        let newPhoneNum = '';
        for (let i = 0; i < phoneNum.length; i++) {
            const code = phoneNum.charCodeAt(i);
            if (code <= 57 && code >= 48) {
                newPhoneNum += phoneNum.charAt(i);
            }
        }
        return newPhoneNum;
    }

    const onChange = e => {
        if (e.target.name === 'phone') {
            e.target.value = fitPhoneNum(e.target.value);
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        buildProfile(formData, history, true);
    }

    if (auth.user) {
        formData.email = auth.user.email;
        formData.name = auth.user.name;
    }

    return auth.user ? (
        <div className="h-center top-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Edit Profile
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-user-edit"></i>
                    {' '}Hey {auth.user.name.split(' ')[0]}, it's time to update your CodeCircle profile!
                </p>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={auth.user.name} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="email" value={auth.user.email} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="phone" placeholder="What's your phone number?" value={phone} onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" name="website" placeholder="Do you have a website?" value={website} onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" placeholder="Where do you live?" value={location} onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicOccupation">
                        <Form.Label>Occupation (Required)</Form.Label>
                        <Form.Control type="text" name="occupation" placeholder="What's your occupation (intern, junior developer, senior developer, etc.)?" value={occupation} onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" name="company" placeholder="What company do you work for (corporation, startup, freelance, etc.)?" value={company} onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicSkills">
                        <Form.Label>Skills (Required)</Form.Label>
                        <Form.Control type="text" name="skills" placeholder="What're your skills (enter as comma-separated list)?" value={skills} onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicGitHub">
                        <Form.Label>GitHub Username</Form.Label>
                        <Form.Control type="text" name="githubusername" placeholder="What's your GitHub username?" value={githubusername} onChange={onChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicBio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" as="textarea" name="bio" placeholder="Tell us a little about yourself!" value={bio} onChange={onChange} />
                    </Form.Group>

                    <div className="mb3">
                        <Button variant="secondary" onClick={e => toggleSocial(!displaySocial)}>
                            Display Social Media Links
                        </Button>
                    </div>
                    {
                        displaySocial && (
                            <Fragment>
                                <Form.Group controlId="formBasicFacebook">
                                    <Form.Label>Facebook</Form.Label>
                                    <Form.Control type="text" name="facebook" placeholder="Link to your Facebook profile!" value={facebook} onChange={onChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicTwitter">
                                    <Form.Label>Twitter</Form.Label>
                                    <Form.Control type="text" name="twitter" placeholder="Link to your Twitter profile!" value={twitter} onChange={onChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicYouTube">
                                    <Form.Label>YouTube</Form.Label>
                                    <Form.Control type="text" name="youtube" placeholder="Link to your YouTube channel!" value={youtube} onChange={onChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicInstagram">
                                    <Form.Label>Instagram</Form.Label>
                                    <Form.Control type="text" name="instagram" placeholder="Link to your Instagram profile!" value={instagram} onChange={onChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicLinkedIn">
                                    <Form.Label>LinkedIn</Form.Label>
                                    <Form.Control type="text" name="linkedin" placeholder="Link to your LinkedIn profile!" value={linkedin} onChange={onChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPinterest">
                                    <Form.Label>Pinterest</Form.Label>
                                    <Form.Control type="text" name="pinterest" placeholder="Link to your Pinterest profile!" value={pinterest} onChange={onChange} />
                                </Form.Group>
                            </Fragment>
                        )
                    }


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
    ) : <Spinner />
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    buildProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { buildProfile, getProfile })(withRouter(EditProfile)); 
