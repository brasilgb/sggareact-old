import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { IconContext } from 'react-icons';
import { FaChartLine, FaRegClock, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { HiExclamation } from 'react-icons/hi';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

const MdlCapitalizar = ({ id = 'modal', onClose = () => { }, onLote, onIdLote, onDtFemea, onDtMacho }) => {

    const { errors } = usePage().props
    const capFemeasRef = useRef()
    const capMachosRef = useRef()

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }

    const [startFemeaDate, setStartFemeaDate] = useState(onDtFemea === null ? new Date() : new Date(onDtFemea));
    const [startMachoDate, setStartMachoDate] = useState(onDtMacho === null ? new Date() : new Date(onDtMacho));

    const dateFemCap = moment(startFemeaDate).format("YYYY-MM-DD");
    const dateMacCap = moment(startMachoDate).format("YYYY-MM-DD");

    const lotefemea = onLote.data.map((lt) => (lt.id_lote == onIdLote ? Number(lt.femea_capitalizada) : 0))
    const lotemacho = onLote.data.map((lt) => (lt.id_lote == onIdLote ? Number(lt.macho_capitalizado) : 0))

    const datalotefemea = new Date(onDtFemea)
    const datalotemacho = new Date(onDtMacho)
    
    useEffect(() => {
        capFemeasRef.current.value = lotefemea
        capMachosRef.current.value = lotemacho
    }, [])

    const saveData = (e) => {
        e.preventDefault();

        const femea_capitalizada = capFemeasRef.current.value;
        const data_femea_capitalizada = dateFemCap;
        const macho_capitalizado = capMachosRef.current.value;
        const data_macho_capitalizado = dateMacCap;
        Inertia.get(route('lotes.capitalizar', onIdLote), { femea_capitalizada, data_femea_capitalizada, macho_capitalizado, data_macho_capitalizado },
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
                                        <FaChartLine />
                                    </div>
                                </IconContext.Provider>
                                <span className="pl-2">Capitalizar aves</span>
                            </h1>
                        </div>

                        {/* <!--content--> */}
                        <div className="text-xl">
                            <div className="p-4 flex-auto justify-center">

                                <div className="w-full">
                                    <div className="flex flex-col justify-items-start w-full mb-3">
                                        <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="semanainicial">
                                            Total de fêmeas a capitalizar
                                        </label>
                                        <input
                                            ref={capFemeasRef}
                                            type="number"
                                            id="femea_capitalizada"
                                            className="border p-2 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-blue-300 w-full ease-linear transition-all duration-150"
                                        />
                                        {errors.femea_capitalizada && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation semanainicial="text-sm mt-1" /> {errors.femea_capitalizada}</div>}
                                    </div>
                                    <div className="flex flex-col justify-items-start w-full mb-3">
                                        <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="datainicial">
                                            Data de capitalização de fêmeas
                                        </label>

                                        <DatePicker
                                            selected={startFemeaDate}
                                            onChange={(date) => setStartFemeaDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            locale={ptBR}
                                            className="border p-2 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-blue-300 w-full ease-linear transition-all duration-150"
                                        />
                                        {errors.data_femea_capitalizada && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-sm mt-1" /> {errors.data_femea_capitalizada}</div>}
                                    </div>
                                    <div className="flex flex-col justify-items-start w-full mb-3">
                                        <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="semanafinal">
                                            Total de machos a capitalizar
                                        </label>
                                        <input
                                            ref={capMachosRef}
                                            type="number"
                                            id="macho_capitalizado"
                                            className="border p-2 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-blue-300 w-full ease-linear transition-all duration-150" />
                                        {errors.macho_capitalizado && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-sm mt-1" /> {errors.macho_capitalizado}</div>}
                                    </div>
                                    <div className="flex flex-col justify-items-start w-full mb-3">
                                        <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="datainicial">
                                            Data de capitalização de machos
                                        </label>

                                        <DatePicker
                                            selected={startMachoDate}
                                            onChange={(date) => setStartMachoDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            locale={ptBR}
                                            className="border p-2 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-blue-300 w-full ease-linear transition-all duration-150"
                                        />
                                        {errors.data_macho_capitalizado && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-sm mt-1" /> {errors.data_macho_capitalizado}</div>}
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

export default MdlCapitalizar
