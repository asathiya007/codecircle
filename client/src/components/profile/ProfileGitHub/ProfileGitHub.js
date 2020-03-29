import React, {useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {getGitHubRepos} from '../../../actions/profile';
import {connect} from 'react-redux'; 
import Jumbotron from 'react-bootstrap/Jumbotron';
import Moment from 'react-moment';
import Badge from 'react-bootstrap/Badge';

const ProfileGitHub = ({username, getGitHubRepos, repos}) => {
    useEffect(() => {
        if (username) {
            getGitHubRepos(username); 
        }
    }, [getGitHubRepos, username]);
    
    return (
        <div className="profile-github">
            <p className="f3 fw5 text-primary">
                Recent GitHub Repos
            </p>
            {
                username && repos && repos.length > 0 ? (repos.map(repo => (
                    <Jumbotron key={repo.id} className="repo">
                        <div className="w-70 mr3">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="f4 fw5 mv0 pv0">{repo.name}</a>
                            <p className="mv0 pv0">
                                <span className="fw5">Created: </span>
                                <Moment utc format="YYYY/MM/DD">
                                    {repo.created_at}
                                </Moment>
                            </p>
                            <p className="mv0 pv0">
                                <span className="fw5">Updated: </span>
                                <Moment utc format="YYYY/MM/DD">
                                    {repo.updated_at}
                                </Moment>
                            </p>
                            <p className="mv0 pv0">
                                <span className="fw5">Pushed: </span>
                                <Moment utc format="YYYY/MM/DD">
                                    {repo.pushed_at}
                                </Moment>
                            </p>
                            <p className="mv0 pv0">
                                <span className="fw5">Language: </span>
                                {repo.language}
                            </p>
                            <p className="mv0 pv0">
                                <span className="fw5">Description: </span>
                                {repo.description}
                            </p>
                        </div>
                        <div className="w-20 ml3 tr v-center">
                            <Badge variant="primary" className="mv1">
                                <span className="f5 fw5">Stars: {repo.stargazers_count}</span>
                            </Badge>
                            <Badge variant="secondary" className="mv1">
                                <span className="f5 fw5">Watchers: {repo.watchers_count}</span> 
                            </Badge>
                            <Badge variant="dark" className="mv1">
                                <span className="f5 fw5">Forks: {repo.forks_count}</span>
                            </Badge>
                        </div>
                    </Jumbotron>
                ))) : (
                    <Jumbotron>
                        <p className="f4 fw5 mv0 pv0">
                            No recent GitHub repos
                        </p>
                    </Jumbotron>
                )
            }
        </div>
    ); 
}

ProfileGitHub.propTypes = { 
    getGitHubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
}); 

export default connect(mapStateToProps, {getGitHubRepos})(ProfileGitHub); 
