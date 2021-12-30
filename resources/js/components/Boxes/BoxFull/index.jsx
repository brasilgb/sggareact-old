import React, { Fragment } from 'react';

const BoxFull = ({ children }) => {
    return (
        <Fragment>
            <div className='container  mx-auto bg-gray-50 border border-white rounded-md shadow-sm'>

                {children}
                
            </div>
        </Fragment>
    )
};

export default BoxFull;
