import React, {useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {getProfiles} from '../../../actions/profile';
import {connect} from 'react-redux';
import ProfileItem from '../ProfileItem/ProfileItem';

const Profiles = ({profile, getProfiles}) => {
    useEffect(() => {
        getProfiles(); 
    }, [getProfiles]); 

    return (profile && 
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Profiles
                </p>
                <p className="f3 fw4">
                    <i className="fab fa-connectdevelop"></i>
                    {' '}Connect with these awesome coders!
                </p>
                <div>
                    {
                        profile.profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    }
                </div>
            </div>
        </div>
    ); 
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired, 
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
}); 

export default connect(mapStateToProps, {getProfiles})(Profiles);
