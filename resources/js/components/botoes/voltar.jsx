import { InertiaLink } from '@inertiajs/inertia-react';
import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaArrowLeft } from 'react-icons/fa';
import route from 'ziggy';

const BtnVoltar = ({url}) => {
    return (
        <Fragment>

            <InertiaLink
                type="button"
                as="button"
                href={route(url)}
                className="px-4 py-2 border-2 border-white shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
                <div className="flex items-center">
                    <IconContext.Provider value={{ color: "text-white", className: "text-sm" }}>
                        <div>
                            <FaArrowLeft />
                        </div>
                    </IconContext.Provider>
                    <span className="pl-1 font-semibold text-sm">Voltar</span>
                </div>
            </InertiaLink>

        </Fragment>
    )
}

export default BtnVoltar
