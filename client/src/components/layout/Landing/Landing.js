import React from 'react'; 
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Landing = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="f1 fw6">CodeCircle</h1>
                    <p className="f3 fw5">
                        Join this social network to connect with other coders,
                        share your projects, and keep us posted on your career!
                    </p>
                    <div>
                        <Button variant="primary" size="lg" className="mh3 grow" href="/register">
                            Register
                        </Button>
                        <Button variant="primary" size="lg" className="mh3 grow" href="/login">
                            Log In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
}); 

export default connect(mapStateToProps)(Landing); 
