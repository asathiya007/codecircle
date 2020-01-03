import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = (
{
    component: Component,
    auth,
    ...rest
}) => {
    return ( 
        <Route
            {...rest}
            render={props => !auth.token ? (
                <Redirect to="/login" />
            ) : (
                <Component {...props} {...rest} />
            )}
        />
    );
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);