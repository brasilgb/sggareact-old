import { InertiaLink } from '@inertiajs/inertia-react';
import React, { Fragment } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

const Pagination = ({ onPaginate }) => {

    const clearLinks = [...onPaginate.links];
    clearLinks.shift();
    clearLinks.pop();

    return (
        <Fragment>

            <div className="flex items-center justify-center bg-gray-100 py-2 mt-4 rounded-b-md text-sm font-medium border-t">
                {onPaginate.prev_page_url &&
                    <InertiaLink
                        href={onPaginate.prev_page_url}
                        className="flex items-center shadow-md hover:shadow-lg border-1 hover:border-white px-4 py-2 mx-1 text-gray-600 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                        <HiArrowLeft /><span className="ml-1">Ant.</span>
                    </InertiaLink>
                }

                {clearLinks.map((link, index) => (
                    <InertiaLink
                        key={index}
                        href={link.url} 
                        className={"flex items-center shadow-md hover:shadow-lg border-1 hover:border-white px-4 py-2 mx-1 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200" + (link.active ? " bg-blue-600 text-white": " text-gray-600")}>
                        {link.label}
                    </InertiaLink>
                ))}

                {onPaginate.next_page_url &&
                    <InertiaLink
                        href={onPaginate.next_page_url}
                        className="flex items-center shadow-md hover:shadow-lg border-1 hover:border-white px-4 py-2 mx-1 text-gray-600 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                        <span className="mr-1">Próx.</span><HiArrowRight />
                    </InertiaLink>
                }
            </div>

        </Fragment>
    )
}

export default Pagination
