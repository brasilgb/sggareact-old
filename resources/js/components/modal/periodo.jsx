import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useRef, useState } from 'react'
import { IconContext } from 'react-icons';
import { FaRegClock, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { HiExclamation } from 'react-icons/hi';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

const MdlPeriodo = ({ id = 'modal', onClose = () => { } }) => {

    const { errors } = usePage().props
    const semInicialRef = useRef()
    const semFinalRef = useRef()

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }

    const [startDate, setStartDate] = useState(new Date());
    const dateSearch = moment(startDate).format("YYYY-MM-DD");
    const saveData = (e) => {
        e.preventDefault();

        const datainicial = dateSearch;
        const semanainicial = semInicialRef.current.value;
        const semanafinal = semFinalRef.current.value;
        Inertia.post(route('periodos.store'), { datainicial, semanainicial, semanafinal },
            {
                preserveState: (page) => Object.keys(page.props.errors).length > 0,
            }
        )
    }

    return (
        <Fragment>
            <div id={id} onClick={handleOutsideClick} className="min-w-screen h-screen animated fadeIn faster fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

                <div className="absolute bg-black opacity-30 inset-0 z-0"></div>

                <div className="w-full max-w-lg relative mx-auto my-auto rounded-lg shadow-lg  bg-white ">
                    <form onSubmit={saveData} autoComplete="off">
                        {/* Header */}
                        <div className="p-3 bg-gray-200 rounded-t-lg border-b border-gray-300">
                            <h1 className="flex items-center font-roboto font-bold text-lg text-gray-600">
                                <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                                    <div>
                                        <FaRegClock />
                                    </div>
                                </IconContext.Provider>
                                <span className="pl-2">Iniciar período</span>
                            </h1>
                        </div>
                        {/* <!--content--> */}
                        <div className="text-xl">
                            <div className="p-4 flex-auto justify-center">

                                <div className="w-full">
                                    <div className="flex flex-col justify-items-start w-full mb-3">
                                        <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="semanainicial">
                                            Semana Inicial
                                        </label>
                                        <input
                                            ref={semInicialRef}
                                            type="number"
                                            min="1"
                                            step="1"
                                            id="semanainicial"
                                            className={`block w-full px-4 py-2 text-gray-700 bg-white border ${errors.semanainicial ? "border-red-500" : "border-gray-300"}  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                                        />
                                        {errors.semanainicial && <div className="text-sm flex items-center w-full text-red-500"><HiExclamation semanainicial="text-sm" /> {errors.semanainicial}</div>}
                                    </div>
                                    <div className="flex flex-col justify-items-start w-full mb-3">
                                        <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="semanafinal">
                                            Semana Final
                                        </label>
                                        <input
                                            ref={semFinalRef}
                                            type="number"
                                            min="1"
                                            step="1"
                                            id="semanafinal"
                                            className={`block w-full px-4 py-2 text-gray-700 bg-white border ${errors.semanafinal ? "border-red-500" : "border-gray-300"}  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                                             />
                                        {errors.semanafinal && <div className="text-sm flex items-center w-full text-red-500"><HiExclamation className="text-sm" /> {errors.semanafinal}</div>}
                                    </div>
                                    <div className="flex flex-col justify-items-start w-full mb-3">
                                        <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="datainicial">
                                            Data de Início
                                        </label>
                                       
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            locale={ptBR}
                                            className={`block w-full px-4 py-2 text-gray-700 bg-white border ${errors.datainicial ? "border-red-500" : "border-gray-300"}  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                                        />
                                        {errors.datainicial && <div className="flex items-center w-full text-red-500"><HiExclamation className="text-sm" /> {errors.datainicial}</div>}
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* <!--footer--> */}
                        <div className="flex items-center p-3 mt-2 text-center justify-end space-x-4 bg-gray-100 rounded-b-lg border-t">
                            <button onClick={onClose} className="flex items-center px-4 py-2 border-2 border-white shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
                                <IconContext.Provider value={{ color: "text-white", className: "text-sm" }}>
                                    <div>
                                        <FaSignOutAlt />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-sm pl-2 font-semibold">Sair</span>
                            </button>
                            <button className="flex items-center px-4 py-2 border-2 border-white shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                <IconContext.Provider value={{ color: "text-white", className: "text-lg" }}>
                                    <div>
                                        <FaSave />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-sm pl-2 font-semibold">Salvar</span>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </Fragment>
    )
}

export default MdlPeriodo
