import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Moment from 'react-moment';

const ProfileExperience = ({ profile }) => {
    return (
        <div className="profile-experience h-100">
            <Jumbotron className="h-100">
                <p className="f3 fw5 text-primary">{profile.name.trim().split(' ')[0]}'s Experience</p>
                {profile.experience && profile.experience.length > 0 ? (
                    <div>
                        {
                            profile.experience.map(exp => (
                                <div key={exp._id}>
                                    <p className="f4 fw5 mv0 pv0">{exp.company}</p>
                                    <p className="mv0 pv0">
                                        <span className="fw5">Duration: </span>
                                        <Moment format="YYYY/MM/DD">
                                            {exp.from}
                                        </Moment> - {!exp.to ? 'Now' :
                                            <Moment format="YYYY/MM/DD">
                                                {exp.to}
                                            </Moment>}
                                    </p>
                                    <p className="mv0 pv0">
                                        <span className="fw5">Job: </span>
                                        {exp.title}
                                    </p>
                                    {
                                        exp.location && (
                                            <p className="mv0 pv0">
                                                <span className="fw5">Location: </span>
                                                {exp.location}
                                            </p>
                                        )
                                    }
                                    {
                                        exp.description && (
                                            <p className="mv0 pv0">
                                                <span className="fw5">Description: </span>
                                                {exp.description}
                                            </p>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                ) : (
                        <p className="f4 fw5">No experience credentials</p>
                    )}
            </Jumbotron>
        </div>
    )
}

ProfileExperience.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileExperience; 
