import React from 'react'; 
import PropTypes from 'prop-types'; 
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const ProfileItem = ({profile}) => {
    return (
        <Jumbotron>
            <div style={{
                display: "flex",
                justifyContent: "space-evenly"
            }}>
                <div className="v-center h-center">
                    <Image roundedCircle src={profile.user.avatar} />
                    <div className="mt3 h-center">
                        <Button variant="primary" className="w-80" href={`/profiles/${profile._id}`}>Visit Profile</Button>
                    </div>
                </div>
                <div className="v-center w-75">
                    <p className="f2 fw4 tc">
                        {profile.user.name}
                    </p>
                    <p className="f3 fw3 tc">
                        {profile.occupation} 
                        {profile.company && (<span> at {profile.company}</span>)}
                    </p>
                    <p className="f4 fw3 tc">
                        {profile.bio && (<span>{profile.bio}</span>)}
                    </p>
                    <div className="h-center">
                        <div>
                            <p className="f5 fw3">
                                <i className="fas fa-envelope mr1"></i> {profile.email}
                            </p>
                            <p className="f5 fw3">
                                {
                                    profile.phone && (
                                        <span>
                                            <i className="fas fa-phone mr1"></i>
                                            {' ' + profile.phone}
                                        </span>
                                    )
                                }
                            </p>
                            <p className="f5 fw3">
                                {
                                    profile.website && (
                                        <span>
                                            <i className="fas fa-globe mr1"></i>
                                            {' '}
                                            <a target="_blank" rel="noopener noreferrer" href={profile.website}>{profile.website}</a>
                                        </span>
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Jumbotron>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem; 
