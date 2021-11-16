import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useRef } from 'react'
import { IconContext } from 'react-icons';
import { FaRegClock, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { HiExclamation } from 'react-icons/hi';

const MdlSemana = ({ id = 'modal', onClose = () => { }, onIdPeriodo }) => {

    const { errors } = usePage().props
    const semanaRef = useRef()
    //const periodoRef = useRef(onIdPeriodo)

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }

    const saveData = (e) => {
        e.preventDefault();
        
        const numsemanas = semanaRef.current.value;
        const idperiodo = onIdPeriodo;

        Inertia.post(route('periodos.addsemanasperiodo'), { numsemanas, idperiodo },
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
                                <span className="pl-2">Adicionar semanas ao período</span>
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
                                            ref={semanaRef}
                                            type="number"
                                            min="1"
                                            step="1"
                                            id="numsemanas"
                                            className="border p-2 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-blue-300 w-full ease-linear transition-all duration-150" />
                                     {errors.numsemanas && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation /> {errors.numsemanas}</div>}
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

export default MdlSemana
