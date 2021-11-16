import React, { Fragment } from 'react'
import { IconContext } from 'react-icons'
import { FaTrash } from 'react-icons/fa'

const BtnDelete = ({ btnOnclick }) => {
    return (
        <Fragment>
            <button
                type="button"
                as="button"
                onClick={btnOnclick}
                className="px-4 py-2 shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
                <div className="flex items-center">
                    <IconContext.Provider value={{ color: "text-white", className: "text-sm" }}>
                        <div>
                            <FaTrash />
                        </div>
                    </IconContext.Provider>
                    <span className="pl-1 font-medium text-md">Excluir</span>
                </div>
            </button>
        </Fragment>
    )
}

export default BtnDelete
