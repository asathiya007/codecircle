import React, {useEffect, Fragment} from 'react';
import SpinnerGIF from './Spinner.gif';
import {connect} from 'react-redux';
import {clearAlerts} from '../../../actions/alert';

const Spinner = ({clearAlerts}) => {
    useEffect(() => {
        clearAlerts();
    }, [clearAlerts]); 

    return (
        <div className="h-center v-center w-100 h-100">
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
        </div>
    )
}

export default connect(null, {clearAlerts})(Spinner);
