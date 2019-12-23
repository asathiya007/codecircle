import React, {Fragment} from 'react';
import SpinnerGIF from './Spinner.gif';

const Spinner = () => {
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

export default Spinner
