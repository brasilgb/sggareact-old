import React, { Fragment } from 'react'

const Footer = () => {
    let data = new Date();
    let ano = data.getFullYear();
    return (
        <Fragment>
            <footer className="flex flex-col items-center justify-center px-6 py-2 bg-sgga-secundary-a dark:bg-gray-800 sm:flex-row">
                <p className="py-2 text-gray-100 dark:text-white sm:py-0">{ ano }All rights reserved</p>
            </footer>
        </Fragment>
    )
}

export default Footer
