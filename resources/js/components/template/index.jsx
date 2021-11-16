import React, { Fragment } from 'react'
import Footer from '../footer'
import NavBar from '../navbar'

const Template = ({ children }) => {
    return (
        <Fragment>
            <div className="flex flex-col min-h-screen bg-gray-200 font-roboto w-full">
                <div className="w-full">
                    <NavBar />
                </div>
                <div className="flex-grow w-full p-4">
                    {children}
                </div>
                <div className="w-full">
                    <Footer />
                </div>
            </div>
        </Fragment>
    )
}

export default Template
