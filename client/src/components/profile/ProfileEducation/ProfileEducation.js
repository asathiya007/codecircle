import React from 'react'; 
import PropTypes from 'prop-types'; 
import Jumbotron from 'react-bootstrap/Jumbotron'; 
import Moment from 'react-moment';

const ProfileEducation = ({profile}) => {
    return (
        <div className="profile-education h-100">
            <Jumbotron className="h-100">
                <p className="f3 fw5">{profile.name.trim().split(' ')[0]}'s Education</p>
                {profile.education && profile.education.length > 0 ? (
                    <div>
                        {
                            profile.education.map(edu => (
                                <div key={edu._id}>
                                    <p className="f4 fw5 mv0 pv0">{edu.institution}</p>
                                    <p className="mv0 pv0">
                                        <span className="fw5">Duration: </span>
                                        <Moment format="YYYY/MM/DD">
                                            {edu.from}
                                        </Moment> - {!edu.to ? 'Now' :
                                            <Moment format="YYYY/MM/DD">
                                                {edu.to}
                                            </Moment>}
                                    </p>
                                    <p className="mv0 pv0">
                                        <span className="fw5">Degree: </span>
                                        {edu.degree} in {edu.fieldOfStudy}
                                    </p>
                                    {
                                        edu.description && (
                                            <p className="mv0 pv0">
                                                <span className="fw5">Description: </span>
                                                {edu.description}
                                            </p>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                ) : (
                        <p className="f4 fw5">No education credentials</p>
                    )}
            </Jumbotron>
        </div>
    )
}

ProfileEducation.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileEducation; 
