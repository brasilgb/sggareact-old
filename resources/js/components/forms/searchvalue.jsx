import React, { Fragment, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

const FrmSearchValue = ({url, placeHolder}) => {

    const {errors} = usePage().props
    const valueSearchRef = useRef();

    const searchData = (e) => {
        e.preventDefault();
        const search = valueSearchRef.current.value;
        Inertia.post(route(url), { search });
    };

    return (
        <Fragment>
            <form onSubmit={searchData} autoComplete="of">
                <div className="relative mt-1">
                    <input
                        ref={valueSearchRef}
                        placeholder={placeHolder}
                        className={`px-4 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border ${errors.search ? "border-red-500" : "border-gray-300"} outline-none focus:outline-none focus:ring focus:ring-blue-300 w-full`}
                    />
                    <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
                        <IconContext.Provider value={{ color: "text-white", className: "text-lg mt-1" }}>
                            <div>
                                <FaSearch />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
            </form>
        </Fragment>
    )
}

export default FrmSearchValue