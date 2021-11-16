import React, { Fragment } from 'react'
import { IconContext } from 'react-icons'
import { FaChartLine } from 'react-icons/fa'

const BtnCapitalizar = ({ btnOnClick }) => {
    return (
        <Fragment>
            <button
                type="button"
                as="button"
                onClick={btnOnClick}
                className="px-4 py-2 shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
            >
                <div className="flex items-center">
                    <IconContext.Provider value={{ color: "text-white", className: "text-md" }}>
                        <div>
                            <FaChartLine />
                        </div>
                    </IconContext.Provider>
                    <span className="pl-1 font-medium text-md">Capitalizar</span>
                </div>
            </button>
        </Fragment>
    )
}

export default BtnCapitalizar
