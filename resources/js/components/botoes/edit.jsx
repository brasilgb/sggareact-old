import { InertiaLink } from '@inertiajs/inertia-react'
import React, { Fragment } from 'react'
import { IconContext } from 'react-icons'
import { FaPen } from 'react-icons/fa'

const BtnEdit = ({ btnOnclick }) => {
    return (
        <Fragment>
            <InertiaLink
                type="button"
                as="button"
                href={btnOnclick}
                className="flex items-center px-4 py-2 shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
                <div className="flex items-center">
                    <IconContext.Provider value={{ color: "text-white", className: "text-sm" }}>
                        <div>
                            <FaPen />
                        </div>
                    </IconContext.Provider>
                    <span className="pl-1 font-medium text-sm">Editar</span>
                </div>
            </InertiaLink>
        </Fragment>
    )
}

export default BtnEdit
