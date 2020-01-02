import React from 'react'
import PropTypes from 'prop-types'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';

const ProfileTop = ({profile}) => {
    return (
        <Jumbotron className="profile-top">
            <Image roundedCircle src={profile.user.avatar} alt="profile" className="w-40"/>
            <p className="f2 fw5 tc mt2 text-primary">
                {profile.user.name}
            </p>
            <p className="f3 fw3 tc">
                {profile.occupation}
                {profile.company && (<span> at {profile.company}</span>)}
            </p>
            <p className="f3 fw3 tc">
                {profile.location && (<span>{profile.location}</span>)}
            </p>
            <div className="h-center w-50">
                <div>
                    <p className="f5 fw3 tl">
                        <i className="fas fa-envelope mr1"></i> {profile.email}
                    </p>
                    <p className="f5 fw3 tl">
                        {
                            profile.phone && (
                                <span>
                                    <i className="fas fa-phone mr1"></i>
                                    {' ' + profile.phone}
                                </span>
                            )
                        }
                    </p>
                    <p className="f5 fw3 tl">
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
            <div className="icons">
                {
                    profile.social.facebook && (
                        <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="mh2">
                            <i className="fab fa-facebook fa-2x color-black"></i>
                        </a>
                    )
                }
                {
                    profile.social.twitter && (
                        <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="mh2">
                            <i className="fab fa-twitter fa-2x color-black"></i>
                        </a>
                    )
                }
                {
                    profile.social.youtube && (
                        <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer" className="mh2">
                            <i className="fab fa-youtube fa-2x color-black"></i>
                        </a>
                    )
                }
                {
                    profile.social.linkedin && (
                        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="mh2">
                            <i className="fab fa-linkedin fa-2x color-black"></i>
                        </a>
                    )
                }
                {
                    profile.social.instagram && (
                        <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer" className="mh2">
                            <i className="fab fa-instagram fa-2x color-black"></i>
                        </a>
                    )
                }
                {
                    profile.social.pinterest && (
                        <a href={profile.social.pinterest} target="_blank" rel="noopener noreferrer" className="mh2">
                            <i className="fab fa-pinterest fa-2x color-black"></i>
                        </a>
                    )
                }
            </div>
        </Jumbotron>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop; 
