import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaCubes, FaSave } from 'react-icons/fa';
import BtnVoltar from '../../components/botoes/voltar';
import FrmSearchValue from '../../components/forms/searchvalue';
import Template from '../../components/template';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import { Inertia } from '@inertiajs/inertia';
import route from 'ziggy';
import { HiExclamation } from 'react-icons/hi';

const addlote = ({ busca, lotes }) => {
    const { errors } = usePage().props;
    const loteRef = useRef();
    const femeaRef = useRef();
    const machoRef = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const dateLote = moment(startDate).format("YYYY-MM-DD");

    const saveData = (e) => {
        e.preventDefault();
        const data_lote = dateLote;
        const lote = loteRef.current.value;
        const femea = femeaRef.current.value;
        const macho = machoRef.current.value;

        Inertia.post(route('lotes.store'), { data_lote, lote, femea, macho })
    }
    return (
        <Fragment>
            <Template>
                <div className="container m-auto bg-white my-4 shadow-sm border-2 border-white rounded-md">
                    <div className="border-b bg-gray-100 rounded-t-sm">

                        <div className="flex border-b-2 p-4 border-white">
                            <div className="flex-1">
                                <h1 className="flex items-center text-gray-600 font-medium">
                                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                                        <div>
                                            <FaCubes />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="text-lg pl-2"> Lotes</span>
                                </h1>
                            </div>
                            <div className="flex-1">
                                <nav className="font-sans w-full flex justify-end">
                                    <ol className="flex list-reset text-grey-dark">
                                        <li>
                                            <InertiaLink
                                                href={route('home')}
                                                className="text-gray-500">
                                                Home
                                            </InertiaLink>
                                        </li>
                                        <li><span className="mx-2">/</span></li>
                                        <li>
                                            <InertiaLink
                                                href={route('aviarios.index')}
                                                className="text-gray-500">
                                                Aviários
                                            </InertiaLink>
                                        </li>
                                        <li><span className="mx-2">/</span></li>
                                        <li className="text-gray-700">Adicionar</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="flex p-4">
                            <div className="flex-1">
                                <BtnVoltar url={'aviarios.index'} />
                            </div>
                            <div className="flex-1">
                                <FrmSearchValue url={'lotes.busca'} placeHolder={'Pesquisar por lote'} className="uppercase" />
                            </div>
                        </div>

                    </div>

                    <form onSubmit={saveData} autoComplete="off">
                        <div className="w-full md:w-1/2 md:mx-auto bg-white md:my-20 p-6 rounded-md shadow-md border border-gray-200">
                            <div className="pt-2">
                                <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="data">Data de Entrada do Lote</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    locale={ptBR}
                                    className={`block w-full px-4 py-2 text-gray-700 bg-white border ${errors.data_lote? "border-red-500" : "border-gray-300"} rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                                />
                                {errors.data_lote && <div className="flex items-center w-full text-red-500"><HiExclamation className="text-sm" /> {errors.data_lote}</div>}
                            </div>

                            <div className="pt-2">
                                <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="lote">Identificação do Lote</label>
                                <input
                                    ref={loteRef}
                                    id="lote"
                                    type="text"
                                    className={`uppercase block w-full px-4 py-2 text-gray-700 bg-white border  ${errors.lote? "border-red-500" : "border-gray-300"}  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                                />
                                {errors.lote && <div className="text-sm flex items-center w-full text-red-500"><HiExclamation className="text-sm" /> {errors.lote}</div>}
                            </div>

                            <div className="pt-2">
                                <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="femea">Aves Fêmeas</label>
                                <input
                                    ref={femeaRef}
                                    id="femeas"
                                    type="number"
                                    min="1"
                                    className={`block w-full px-4 py-2 text-gray-700 bg-white border  ${errors.femea ? "border-red-500" : "border-gray-300"}  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                                />
                                {errors.femea && <div className="flex items-center w-full text-red-500"><HiExclamation className="text-sm" /> {errors.femea}</div>}
                            </div>

                            <div className="pt-2">
                                <label className="text-gray-600 text-sm font-medium mb-1" htmlFor="macho">Aves Machos</label>
                                <input
                                    ref={machoRef}
                                    id="macho"
                                    type="number"
                                    min="1"
                                    className={`block w-full px-4 py-2 text-gray-700 bg-white border  ${errors.macho? "border-red-500" : "border-gray-300"}  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                                />
                                {errors.macho && <div className="flex items-center w-full text-red-500"><HiExclamation className="text-sm" /> {errors.macho}</div>}
                            </div>
                        </div>


                        <div className="flex items-center p-3 mt-2 text-center justify-end space-x-4 bg-gray-100 rounded-b-lg border-t">

                            <button
                                className="flex items-center px-4 py-2 border-2 border-white shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
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
            </Template>
        </Fragment>
    )
}

export default addlote
