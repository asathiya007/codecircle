import React, {useEffect, Fragment} from 'react';
import SpinnerGIF from './Spinner.gif';
import {connect} from 'react-redux';
import {clearAlerts} from '../../../actions/alert';

const Spinner = ({clearAlerts}) => {
    useEffect(() => {
        clearAlerts();
    }, [clearAlerts]); 

    return (
        <Fragment>
            <img 
                src={SpinnerGIF} 
                alt="Loading..."
                style={{
                    width: "200px",
                    margin: "auto",
                    display: "block",
                    marginTop: "20%"
                }}
            />
        </Fragment>
    )
}

export default connect(null, {clearAlerts})(Spinner);
