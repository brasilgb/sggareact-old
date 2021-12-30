import React, { Fragment } from 'react';

const BoxSearch = ({ children }) => {
    return (
        <Fragment>
             <div className='flex items-center pl-4 justify-between border-b border-gray-200 bg-gray-50'>
                {children}
            </div>
        </Fragment>
    )
}

export default BoxSearch;