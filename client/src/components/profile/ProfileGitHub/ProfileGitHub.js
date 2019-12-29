import React, {useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {getGitHubRepos} from '../../../actions/profile';
import {connect} from 'react-redux'; 
import Jumbotron from 'react-bootstrap/Jumbotron';

const ProfileGitHub = ({username, getGitHubRepos, repos}) => {
    useEffect(() => {
        getGitHubRepos(username); 
    }, [getGitHubRepos, username]);
    
    return username ? (
        <div className="profile-github">
            <Jumbotron>
            </Jumbotron>
        </div>
    ) : null; 
}

ProfileGitHub.propTypes = { 
    getGitHubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
}); 

export default connect(mapStateToProps, {getGitHubRepos})(ProfileGitHub); 
