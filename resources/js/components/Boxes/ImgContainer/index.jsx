import React, { Fragment } from 'react';

const ImgContainer = ({ children, classValue }) => {
    return (
        <Fragment>
            <div className={`p-8 ${classValue}`}>
                {children}
            </div>
        </Fragment>
    )
}

export default ImgContainer;