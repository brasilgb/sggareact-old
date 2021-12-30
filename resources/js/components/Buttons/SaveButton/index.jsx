import React, { Fragment } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';

const SaveButton = () => {
    return (
        <Fragment>
            <div className='w-full flex items-center justify-end border-t border-gray-200 pt-4 mt-4'>
                <button
                    className="flex items-center justify-center py-2 px-4 bg-blue-500 border-2 border-white text-gray-50 rounded-md shadow-md hover:bg-blue-600 transition duration-400"
                >
                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                        <div>
                            <IoSaveOutline />
                        </div>
                        <span className="ml-2 font-medium">Salvar</span>
                    </IconContext.Provider>
                </button>
            </div>

        </Fragment>
    )
}

export default SaveButton;
