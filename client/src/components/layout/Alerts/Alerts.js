import React from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Alerts = ({alerts}) => {
    return (
        <div className="pt3 alerts w-100">
            {
                alerts !== null && alerts.length > 0 && alerts.map(
                    alert => (
                        <Alert key={alert.id} variant={alert.alertType} className="w-40">
                            {alert.msg}
                        </Alert>
                    )
                )
            }
        </div>
    )
}

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
}); 

export default connect(mapStateToProps)(Alerts); 
