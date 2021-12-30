import React, { Fragment } from 'react'
import { Inertia } from '@inertiajs/inertia';
import { HiTrash, HiX } from 'react-icons/hi';
import route from 'ziggy';
const Modal = ({ id = 'modal', onClose = () => { }, onIdCategory, children, url }) => {

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }

    const onDelete = () => {
        Inertia.post(route(url, onIdCategory), { _method: 'delete' });
        onClose();
    }

    return (
        <Fragment>
            <div id={id} onClick={handleOutsideClick} className="min-w-screen h-screen animated fadeIn faster fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ">
                <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
                <div className="w-full  max-w-lg relative mx-auto my-auto rounded-md shadow-lg bg-gray-50 border-2 border-white ">
                    {/* <!--content--> */}
                    <div className="text-xl">
                        {children}
                    </div>
                    {/* <!--footer--> */}
                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <button onClick={onClose} className="mb-2 md:mb-0 bg-gray-200 px-5 py-2 text-sm shadow-sm font-medium border-2 border-white text-gray-700 rounded-md hover:bg-gray-300">
                            <span className="flex align-center"><HiX className="text-xl" /> Cancel</span>
                        </button>
                        <button onClick={onDelete} className="mb-2 md:mb-0 bg-red-500 border-2 border-white px-5 py-2 text-sm shadow-md font-medium text-white rounded-md hover:bg-red-600">
                            <span className="flex align-center"><HiTrash className="text-xl" />Excluir</span>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Modal;

