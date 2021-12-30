import React, { Fragment, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import useOutsideClick from "./useOutsideClick";
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';
import { HiChevronDown, HiChevronRight, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import route from 'ziggy'
import { InertiaLink } from '@inertiajs/inertia-react';

const NavBar = () => {

    const [menuCategoryOpen, setMenuCategoryOpen] = useState([false, false]);

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

    const ref = useRef();

    useOutsideClick(ref, () => {
        if (menuCategoryOpen) setMenuCategoryOpen([false, false]);
    });

    const [menuOpen, setMenuOpen] = useState(menuOpen);

    return (
        <Fragment>

            <nav ref={ref} className="bg-gray-200 shadow dark:bg-gray-800 font-roboto font-normal border-b border-white">
                <div className="container py-2 mx-auto">
                    <div className="2xl:flex 2xl:items-center 2xl:justify-between">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold text-gray-600">
                                <a className="text-2xl font-bold text-gray-600 dark:text-white 2xl:text-3xl hover:text-gray-500 dark:hover:text-gray-500" href="#">Brand</a>
                            </div>

                            {/* <!-- Mobile menu button --> */}
                            <div className="flex 2xl:hidden">
                                <a
                                    type="button"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="text-gray-600 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:text-gray-500 dark:focus:text-gray-400"
                                    aria-label="toggle menu"
                                >
                                    <IconContext.Provider value={{ color: "text-white", className: "text-2xl" }}>
                                        <div>
                                            <FaBars />
                                        </div>
                                    </IconContext.Provider>
                                </a>
                            </div>
                        </div>

                        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                        <div className={`flex-1 2xl:flex 2xl:items-center 2xl:justify-between
                        ${menuOpen ? " block" : " hidden"}`}>
                            <div className="flex flex-col -mx-4 2xl:flex-row 2xl:items-center 2xl:mx-8">

                                {/* Home */}
                                <InertiaLink
                                    href={route('home')}
                                    className={`relative flex items-center px-2 py-2 mx-1 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                    ${route().current('home') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                >
                                    Home
                                </InertiaLink>

                                {/* Períodos */}
                                <InertiaLink
                                    href={route('periodos.index')}
                                    className={`relative flex items-center px-2 py-2 mx-1 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                    ${route().current('periodos.index') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                >
                                    Períodos
                                </InertiaLink>

                                {/* Lotes e Aviários */}
                                <div>
                                    <a
                                        href="#"
                                        onClick={(e) => toggleSubMenu(e, '1')}
                                        className={`relative flex items-center px-2 py-2 mx-1 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('lotes*') || route().current('aviarios*') ? " bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Lotes/Aviários
                                    </a>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['1'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('lotes.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Lotes
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('aviarios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Aviarios
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Coletas */}
                                <InertiaLink
                                    href={route('coletas.index')}
                                    className={`relative flex items-center px-2 py-2 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                    ${route().current('coletas*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                >
                                    Coletas
                                </InertiaLink>

                                {/* Ovos */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '2')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Ovos
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['2'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Envio
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Descarte
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Aves */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '3')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Aves
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['3'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Mortalidaes
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Pesagem
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Ração */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '4')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Ração
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['4'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Recebimento
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Consumo
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Tarefas */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '5')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Tarefas
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['5'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Tarefas Gerais
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Controle Diário
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Financeiro */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '6')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Financeiro
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['6'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Despesas
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Receita
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Metas */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '7')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Metas
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['7'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Eclosão
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Fertilidade
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Producão
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Configurações */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '8')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Configurações
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['8'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Empresa
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            E-mail
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Backup
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Usuários
                                        </InertiaLink>
                                    </div>
                                </div>

                                {/* Relatórios */}
                                <div>
                                    <button
                                        onClick={(e) => toggleSubMenu(e, '9')}
                                        className={`relative flex items-center px-2 py-1 mx-1 mt-2 text-md transition-colors duration-200 transform rounded-md 2xl:mt-0 dark:text-gray-500
                                        ${route().current('envios*') || route().current('descartes*') ? "bg-sgga-primary-a text-white hover:text-gray-300 border-2 border-white" : "text-gray-600 hover:text-gray-500"}`}
                                    >
                                        <HiChevronDown style={{ marginBottom: 0 }} /> Relatórios
                                    </button>
                                    <div className={"absolute mt-4 z-20 w-56 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen['9'] ? " block" : " hidden")}>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href={route('envios.index')}
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Movimento Diário
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Coletas
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Financeiro
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Estoque de Aves
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Estoque de Ovos
                                        </InertiaLink>
                                        <InertiaLink
                                            as="button"
                                            type="button"
                                            href="#"
                                            className="flex items-center w-full p-3 text-sm border-b text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <HiChevronRight className="mr-2" />
                                            Consumo de Ração
                                        </InertiaLink>
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center mt-4 2xl:mt-0">
                                <div className="relative inline-block ">
                                    <button
                                        onClick={(e) => toggleSubMenu(e, 200)}
                                        type="button"
                                        className="relative z-10 flex items-center mx-4 text-gray-600 2xl:block dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:text-gray-500 dark:focus:text-gray-400 focus:outline-none"
                                        aria-label="show notifications"
                                    >
                                        <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                                            <div>
                                                <FaBell />
                                            </div>
                                        </IconContext.Provider>
                                    </button>
                                    <div className={"absolute -right-54 2xl:right-0 z-20 w-56 mt-4 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" + (menuCategoryOpen[200] ? " block" : " hidden")} >
                                        <a href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Mensagem
                                        </a>

                                    </div>
                                </div>
                                <div className="relative inline-block right-0">
                                    <button
                                        onClick={(e) => toggleSubMenu(e, 201)}
                                        type="button"
                                        className="relative z-10 flex items-centerhidden mx-4 text-gray-600 2xl:block dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:text-gray-500 dark:focus:text-gray-400 focus:outline-none"
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
                                            href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
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
                                        <a href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
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
