import React from 'react'; 

const NotFound = () => {
    return (
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Page Not Found
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-exclamation-triangle"></i>
                    {' '}Sorry, the page you are looking for does not exist!
                </p>
            </div>
        </div>
    ); 
}

export default NotFound; 
