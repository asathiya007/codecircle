import React, {Fragment} from 'react'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../actions/auth';
import {withRouter} from 'react-router-dom';

const Navigation = ({auth: {isAuthenticated, loading}, logout, history}) => {
    // show links based on if user is authenticated 
    const showLinks = () => {
        if (!loading && isAuthenticated) {
            return <Fragment>
                <Nav.Link href="/profiles" className="text-white">
                    <span className="blue-hover">
                        Coders
                    </span>
                </Nav.Link>
                <Nav.Link href="/posts" className="text-white">
                    <span className="blue-hover">
                        CircleChat
                    </span>
                </Nav.Link>
                <Nav.Link href="/dashboard" className="text-white">
                    <span className="blue-hover">
                        Dashboard
                    </span>
                </Nav.Link>
                <Nav.Link href="/" className="text-white" onClick={e => {
                    e.preventDefault(); 
                    logout(history); 
                }}>
                    <span className="blue-hover">
                        Log Out
                    </span>
                </Nav.Link>
            </Fragment>
        }

        return <Fragment>
            <Nav.Link href="/profiles" className="text-white">
                <span className="blue-hover">
                    Coders
                    </span>
            </Nav.Link>
            <Nav.Link href="/register" className="text-white">
                <span className="blue-hover">
                    Register
                        </span>
            </Nav.Link>
            <Nav.Link href="/login" className="text-white">
                <span className="blue-hover">
                    Log In
                        </span>
            </Nav.Link>
        </Fragment>
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand className="f3 fw7 ml4" href="/">
                    <span className="blue-hover">
                        <i className="fas fa-code"></i> CodeCircle
                    </span>
                </Navbar.Brand>
                <Nav className="ml-auto mr4">
                    {showLinks()}
                </Nav>
            </Navbar>
        </div>
    )
}

Navigation.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}); 

export default connect(mapStateToProps, {logout})(withRouter(Navigation)); 
