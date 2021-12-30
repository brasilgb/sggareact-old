import { InertiaLink } from '@inertiajs/inertia-react';
import React, { Fragment } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import route from 'ziggy';

const BackButton = ({ url }) => {
    return (
        <Fragment>
            <InertiaLink
                href={route(url)}
                as="button"
                className="flex items-center justify-center py-2 px-4 bg-blue-500 border-2 border-white text-gray-50 rounded-md shadow-md hover:bg-blue-600 transition duration-400"
            >
                <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                    <div>
                        <IoArrowBack />
                    </div>
                    <span className="ml-2 font-medium">Voltar</span>
                </IconContext.Provider>

            </InertiaLink>
        </Fragment>
    )
}

export default BackButton;