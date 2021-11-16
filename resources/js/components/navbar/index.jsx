import React, { Fragment, useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import useOutsideClick from "./useOutsideClick";
import { navData } from './navdata';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';
import { HiChevronDown, HiChevronRight, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import route from 'ziggy'
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const [menuCategoryOpen, setMenuCategoryOpen] = useState([false, false]);

    const [subLink, setSubLink] = useState('');
    
    const addActive = (e, url) => {
        e.preventDefault();
        setSubLink(url)
    }
    console.log(subLink);
    


    const toggleSubMenu = (e, i) => {
        e.preventDefault()

        const clone = menuCategoryOpen.slice(0)

        const newState = clone.map((val, index) => {
            if (index === i) {

                return val
            }
            return false
        })
        newState[i] = !newState[i]
        setMenuCategoryOpen(newState)

    };

    const openLink = (e, url) => {
        e.preventDefault();
        Inertia.get(route(url));
    };

    const ref = useRef();

    useOutsideClick(ref, () => {
        if (menuCategoryOpen) setMenuCategoryOpen([false, false]);
    });

    return (
        <Fragment>

            <nav ref={ref} className="bg-sgga-primary-a shadow dark:bg-gray-800 font-roboto font-normal">
                <div className="container px-6 py-4 mx-auto">
                    <div className="2xl:flex 2xl:items-center 2xl:justify-between">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold text-gray-100">
                                <a className="text-2xl font-bold text-gray-100 dark:text-white 2xl:text-3xl hover:text-gray-200 dark:hover:text-gray-300" href="#">Brand</a>
                            </div>

                            {/* <!-- Mobile menu button --> */}
                            <div className="flex 2xl:hidden">
                                <button
                                    type="button"
                                    className="text-gray-100 dark:text-gray-200 hover:text-gray-200 dark:hover:text-gray-400 focus:outline-none focus:text-gray-200 dark:focus:text-gray-400"
                                    aria-label="toggle menu"
                                >
                                    <IconContext.Provider value={{ color: "text-white", className: "text-2xl" }}>
                                        <div>
                                            <FaBars />
                                        </div>
                                    </IconContext.Provider>
                                </button>
                            </div>
                        </div>

                        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                        <div className={"flex-1 2xl:flex 2xl:items-center 2xl:justify-between"}>
                            <div className="flex flex-col -mx-4 2xl:flex-row 2xl:items-center 2xl:mx-8">
                                {navData.map((list, index) => (
                                    <div key={index}>
                                        <button
                                            onClick={(e) => (list.subcategories.length == 0
                                                ? openLink(e, list.url)
                                                : toggleSubMenu(e, index))}
                                            className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md text-gray-100 hover:text-gray-300 transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-200
                                            ${route().current(list.url) ? "bg-gray-900" : ""}`}
                                        >
                                            {list.subcategories.length > 0 ? <HiChevronDown style={{ marginBottom: 0 }} /> : false}{list.categoryname}
                                        </button>
                                        <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen[index] ? " block" : " hidden")}>
                                            {list.subcategories.map((sublist, indexS) => (
                                                <InertiaLink
                                                    as="button"
                                                    type="button"
                                                    key={indexS}
                                                    onClick={(e) => {openLink(e, sublist.url); addActive(e,sublist.url)}}
                                                    className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                                    <HiChevronRight className="mr-2" />
                                                    {sublist.categoryname}
                                                </InertiaLink>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center mt-4 2xl:mt-0">
                                <div className="relative inline-block ">
                                    <button
                                        onClick={(e) => toggleSubMenu(e, 200)}
                                        type="button"
                                        className="relative z-10 flex items-center mx-4 text-gray-100 2xl:block dark:text-gray-200 hover:text-gray-200 dark:hover:text-gray-400 focus:text-gray-200 dark:focus:text-gray-400 focus:outline-none"
                                        aria-label="show notifications"
                                    >
                                        <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                                            <div>
                                                <FaBell />
                                            </div>
                                        </IconContext.Provider>
                                    </button>
                                    <div className={"absolute -right-54 2xl:right-0 z-20 w-56 mt-4 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen[200] ? " block" : " hidden")} >
                                        <a href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Mensagem
                                        </a>

                                    </div>
                                </div>
                                <div className="relative inline-block right-0">
                                    <button
                                        onClick={(e) => toggleSubMenu(e, 201)}
                                        type="button"
                                        className="relative z-10 flex items-centerhidden mx-4 text-gray-100 2xl:block dark:text-gray-200 hover:text-gray-200 dark:hover:text-gray-400 focus:text-gray-200 dark:focus:text-gray-400 focus:outline-none"
                                        aria-label="show notifications"
                                    >
                                        <IconContext.Provider value={{ color: "text-white", className: "text-2xl" }}>
                                            <div>
                                                <FaUserCircle />
                                            </div>
                                        </IconContext.Provider>
                                    </button>
                                    <div className={"absolute -right-54 2xl:right-0 z-20 w-56 mt-4 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen[201] ? " block" : " hidden")} >
                                        <a
                                            href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                                                <div>
                                                    <HiOutlineUser />
                                                </div>
                                            </IconContext.Provider>
                                            <span className="mx-1">
                                                Ver perfil
                                            </span>
                                        </a>
                                        <hr className="border-gray-200 dark:border-gray-700 " />
                                        <a href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                                                <div>
                                                    <HiOutlineLogout />
                                                </div>
                                            </IconContext.Provider>
                                            <span className="mx-1">
                                                Sair
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavBar
