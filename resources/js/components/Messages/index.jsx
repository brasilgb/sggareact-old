import React, { Fragment, useState } from 'react'
import { IconContext } from 'react-icons'
import { IoCheckmarkCircle, IoClose, IoWarningSharp } from 'react-icons/io5'

export const ErrorMessage = ({ message }) => {

    const [closeMessage, setCloseMessage] = useState(true);

    return (
        <Fragment>

            <div className="w-full text-white bg-red-500 border-red-100 rounded-md shadow-sm mb-4">
                <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                    <div className="flex">
                        <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                            <div>
                                <IoWarningSharp/>
                            </div>
                        </IconContext.Provider>

                        <p className="mx-3">{message}</p>
                    </div>

                    <button 
                    onClick={ () => setCloseMessage(!closeMessage) }
                    className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
                    >
                        <IconContext.Provider value={{ color: "text-white", className: "text-2xl" }}>
                            <div>
                                <IoClose />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export const SuccessMessage = ({ message }) => {
    
    const [closeMessage, setCloseMessage] = useState(true);

    return (
        <Fragment>
            {closeMessage && 
            <div className="w-full text-white bg-green-500 border border-green-100 rounded-md shadow-sm mb-4">
                <div className="container flex items-center justify-between px-4 py-4 mx-auto">
                    <div className="flex">
                        <IconContext.Provider value={{ color: "text-white", className: "text-2xl" }}>
                            <div>
                                <IoCheckmarkCircle/>
                            </div>
                        </IconContext.Provider>

                        <p className="mx-3">{message}</p>
                    </div>

                    <button 
                    onClick={ () => setCloseMessage(!closeMessage) }
                    className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
                    >
                        <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                            <div>
                                <IoClose />
                            </div>
                        </IconContext.Provider>

                    </button>
                </div>
            </div>
}
        </Fragment>
    )
}
