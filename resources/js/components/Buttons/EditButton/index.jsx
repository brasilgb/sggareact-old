import React, { Fragment } from 'react';
import { IoCreate } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { InertiaLink } from '@inertiajs/inertia-react';
import route from 'ziggy';

const EditButton = ({ url, param }) => {
    return (
        <Fragment>
            <InertiaLink
                as='button'
                href={route(url, param)}
                className="flex items-center justify-center py-2 px-4 mr-2 bg-yellow-500 border-2 border-white text-gray-50 rounded-md shadow-md hover:bg-yellow-600 transition duration-400"
            >
                <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                    <div>
                        <IoCreate />
                    </div>
                    <span className="ml-2 font-medium">Editar</span>
                </IconContext.Provider>
            </InertiaLink>

        </Fragment>
    )
}

export default EditButton;
