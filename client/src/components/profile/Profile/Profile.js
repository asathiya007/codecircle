import React, {useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {getProfileById} from '../../../actions/profile';
import {connect} from 'react-redux';
import Spinner from '../../layout/Spinner/Spinner';
import ProfileTop from '../../profile/ProfileTop/ProfileTop';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';

const Profile = ({match, getProfileById, profile: {profile, loading}, auth, history}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        loading || !profile ? <Spinner/> : (
            <div className="h-center top-space bottom-space">
                <div className="w-60">
                    <Button variant="secondary" className="mr2" onClick={e => {
                        e.preventDefault();
                        history.goBack();
                    }}>Go Back</Button>
                    {
                        auth.user && profile.user._id === auth.user._id && (
                            <Button variant="primary" className="ml2" onClick={e => {
                                e.preventDefault();
                                history.push('/edit-profile');
                            }}>Edit Profile</Button>
                        )
                    }
                    <div className="profile-grid mt2">
                        <ProfileTop profile={profile} />
                    </div>
                </div>
            </div>
        )
    ); 
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile, 
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileById})(withRouter(Profile));
