import React, {Fragment, useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import Spinner from '../../layout/Spinner/Spinner';
import {getProfile} from '../../../actions/profile';
import { deleteUser } from '../../../actions/auth';  
import Button from 'react-bootstrap/Button';
import Education from '../Education/Education';
import Experience from '../Experience/Experience';

const Dashboard = ({auth: {user}, profile: {profile, loading}, getProfile, deleteUser}) => {
    useEffect(() => {
        getProfile(); 
    }, [getProfile, user]);

    return loading && profile === null ? <Spinner/> : (
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Dashboard
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-user"></i> 
                    {' '}Welcome, {user && user.name}!
                </p>

                {profile !== null && user ? (
                    <Fragment>
                        <div>
                            <Button variant="primary" href={`/profiles/${user._id}`} className="mr3 button-margins">
                                <i className="fas fa-user-circle"></i>
                                {' '}View Profile
                            </Button>
                            <Button variant="primary" href="/edit-profile" className="mh3 button-margins">
                                <i className="fas fa-user-edit"></i>
                                {' '}Edit Profile
                            </Button>
                            <Button variant="primary" href="/add-education" className="mh3 button-margins">
                                <i className="fas fa-graduation-cap"></i>
                                {' '}Add Education
                            </Button>
                            <Button variant="primary" href="/add-experience" className="mh3 button-margins">
                                <i className="fas fa-briefcase"></i>
                                {' '}Add Experience
                            </Button>

                            <Education education={profile.education} />
                            <Experience experience={profile.experience} />

                            <Button variant="danger" onClick={deleteUser}>
                                <i className="fas fa-user-slash"></i>
                                {' '}Delete Account
                            </Button>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p>You don't have a profile yet, add some info</p>
                        <Button variant="primary" href="/create-profile">
                            <i className="fas fa-user-circle"></i>
                            {' '}Create Profile
                        </Button>
                        <Button variant="danger" className="ml3" onClick={deleteUser}>
                            <i className="fas fa-user-slash"></i>
                            {' '}Delete Account
                        </Button>
                    </Fragment>
                )}
            </div>
        </div>
    ); 
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired, 
    deleteUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile, 
    auth: state.auth
}); 

export default connect(mapStateToProps, {getProfile, deleteUser})(Dashboard); 
