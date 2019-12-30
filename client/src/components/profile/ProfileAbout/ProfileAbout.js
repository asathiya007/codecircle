import React from 'react'; 
import PropTypes from 'prop-types'; 
import Jumbotron from 'react-bootstrap/Jumbotron';

const ProfileAbout = ({profile}) => {
    return (
        <div className="profile-about">
            {
                profile.bio && (
                    <Jumbotron>
                        <p className="f3 fw5 tc text-primary">{profile.name.trim().split(' ')[0]}'s Bio</p>
                        <p>{profile.bio}</p>
                    </Jumbotron>
                )
            }
            <Jumbotron>
                <p className="f3 fw5 tc text-primary">{profile.name.trim().split(' ')[0]}'s Skills</p>
                <div className="skills">
                    {
                        profile.skills.map((skill, index) => (
                            <div key={index} className="ph2">
                                <i className="fa fa-check"></i> {skill}
                            </div>
                        ))
                    }
                </div>
            </Jumbotron>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
