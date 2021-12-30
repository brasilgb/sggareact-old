import React, { Fragment } from 'react';

const BoxBody = ({ children, classValue }) => {
    
    return (
        <Fragment>

            <div className={`${classValue} p-4`}>
                {children}
            </div>

        </Fragment>
    )
}

export default BoxBody;