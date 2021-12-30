import { InertiaLink } from '@inertiajs/inertia-react';
import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import route from 'ziggy';

export const BoxHeader = ({ children }) => {
    return (
        <Fragment>
            <div className='p-4 flex items-center justify-between border-b border-gray-200 bg-gray-100'>
                {children}
            </div>
        </Fragment>
    )
}

export const Breadcumb = ({ IconBread, LinksBread }) => {
    return (
        <Fragment>
            <div>
                {/* Breadcumbs */}
                <div className="flex items-center overflow-y-auto whitespace-nowrap">
                    <InertiaLink
                        as="button"
                        href={route('home')}
                        className="text-gray-600 dark:text-gray-200"
                    >
                        {IconBread}
                    </InertiaLink>
                    <span className="mx-2 text-gray-500 dark:text-gray-300">
                        /
                    </span>
                    {
                        LinksBread.map((link, index) => (
                            <div key={index}>
                                <InertiaLink
                                    as="button"
                                    href={route(link.url)}
                                    className={`${link.active ? 'text-gray-400 cursor-default' : 'text-gray-600 hover:underline'} dark:text-gray-200`}
                                    disabled={link.active ? true : false}
                                >
                                    {link.name}
                                </InertiaLink>
                                {link.active === false &&
                                    <span className="mx-2 text-gray-500 dark:text-gray-300">
                                        /
                                    </span>}
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

export const IconTitle = ({ IconValue, TitleValue }) => {
    return (
        <Fragment>
            <div className='flex items-center'>
                <IconContext.Provider value={{ color: "text-white", className: "text-2xl" }}>
                    <div>
                        {IconValue}
                    </div>
                    <span className="mx-2 font-semibold text-xl">{TitleValue}</span>
                </IconContext.Provider>
            </div>
        </Fragment>
    )
}
