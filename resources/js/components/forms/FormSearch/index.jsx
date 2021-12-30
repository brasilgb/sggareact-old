import React, { Fragment, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { InertiaLink } from '@inertiajs/inertia-react';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';

const FormSearch = ({ place, url }) => {
    const searchRef = useRef();
    const searchData = (e) => {
        e.preventDefault();
        const q = searchRef.current.value;
        Inertia.get(route(url), {q});
    }
    return (
        <Fragment>
            <div className="relative right-0 w-full max-w-md py-4 mr-4">
                <form onSubmit={searchData}>
                    <input
                        type="text"
                        ref={searchRef}
                        className="w-full py-2 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-200 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        placeholder={place}

                    />
                    <button
                        
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                        <IconContext.Provider value={{ color: "text-white", className: "text-xl text-gray-500" }}>
                            <div>
                                <IoSearch />
                            </div>
                        </IconContext.Provider>
                    </button>
                </form>

            </div>
        </Fragment>
    )
}

export default FormSearch;
