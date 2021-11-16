import React, { Fragment } from 'react'
import { Inertia } from '@inertiajs/inertia';
import { HiTrash, HiX } from 'react-icons/hi';
import { IconContext } from 'react-icons';

const MdlDelete = ({ id = 'modal', onClose = () => { }, onIdData, url, children }) => {

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }

    const onDelete = () => {
        Inertia.post(route(url, onIdData), { _method: 'delete' });
        onClose();
    }

    return (
        <Fragment>
            <div id={id} onClick={handleOutsideClick} className="min-w-screen h-screen animated fadeIn faster fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

                <div className="absolute bg-black opacity-30 inset-0 z-0"></div>

                <div className="w-full max-w-lg relative mx-auto my-auto rounded-lg shadow-lg  bg-white ">

                        {/* Header */}
                        <div className="p-3 bg-gray-200 rounded-t-lg border-b border-gray-300">
                            <h1 className="flex items-center font-bold text-xl text-gray-600">
                                <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                                    <div>
                                        <HiTrash />
                                    </div>
                                </IconContext.Provider>
                                <span className="pl-2">Excluir</span>
                            </h1>
                        </div>
                        {/* <!--content--> */}
                        <div className="text-xl">
                            {children}
                        </div>
                        {/* <!--footer--> */}
                        <div className="flex items-center p-3 mt-2 text-center justify-end space-x-4 bg-gray-100 rounded-b-lg border-t">
                            <button 
                            onClick={onClose} className="flex items-center px-4 py-2 border-2 border-white shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                <IconContext.Provider value={{ color: "text-white", className: "text-sm" }}>
                                    <div>
                                        <HiX />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-sm pl-2 font-semibold">Sair</span>
                            </button>
                            <button 
                            onClick={onDelete}
                            className="flex items-center px-4 py-2 border-2 border-white shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                            >
                                <IconContext.Provider value={{ color: "text-white", className: "text-lg" }}>
                                    <div>
                                        <HiTrash />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-sm pl-2 font-semibold">Deletar</span>
                            </button>
                        </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MdlDelete;