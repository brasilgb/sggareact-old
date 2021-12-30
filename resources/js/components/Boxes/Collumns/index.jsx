import React, { Fragment } from 'react'

export const ColumnLeft = ({ children, classValue }) => {
    return (
        <Fragment>
            <div className={classValue}>
                {children}
            </div>
        </Fragment>
    )
}

export const ColumnRight = ({ children, classValue }) => {
    return (
        <Fragment>
            <div className={classValue}>
                {children}
            </div>
        </Fragment>
    )
}
