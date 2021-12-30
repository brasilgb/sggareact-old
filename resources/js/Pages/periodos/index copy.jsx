// import React, { Fragment, useState } from 'react';
// import { IconContext } from 'react-icons';
// import { FaCheck, FaPlus, FaRegCheckCircle, FaRegClock, FaTimes, FaTrash } from 'react-icons/fa';
// import Template from '../../components/template'
// import BtnAdicionar from '../../components/botoes/adicionar';
// import FrmSearchDate from '../../components/Forms/searchdate';
// import MdlPeriodo from '../../components/Modal/periodo';
// import MdlSemana from '../../components/Modal/semana';
// import moment from 'moment';
// import MdlDelete from '../../components/Modal/delete';
// import { HiExclamation } from 'react-icons/hi';
// import { Inertia } from '@inertiajs/inertia';
// import Pagination from '../../components/pagination';
// import BtnVoltar from '../../components/botoes/voltar';
// import { InertiaLink } from '@inertiajs/inertia-react';
// const Periodos = ({ periodos, success, busca }) => {

//     const dataFormatada = (dataRaw) => {
//         return moment(dataRaw).format('DD/MM/YYYY');
//     }

//     const [isModalPeriodo, setIsModalPeriodo] = useState(false);
//     const [isModalSemana, setIsModalSemana] = useState(false);
//     const [isModalDelete, setIsModalDelete] = useState(false);
//     const [idPeriodo, setIdPeriodo] = useState();

//     const activePeriodo = (e, idp, ativo) => {
//         e.preventDefault;
//         const idperiodo = idp;

//         Inertia.post(route('periodos.ativaperiodo'), { _methodo: 'put', idperiodo, ativo });
//     }

//     return (
//         <Fragment>
//             <Template>
//                 <div className="container m-auto bg-white my-4 shadow-sm border-2 border-white rounded-md">
//                     <div className="border-b bg-gray-100 rounded-t-sm">

//                         <div className="flex border-b-2 p-4 border-white">
//                             <div className="flex-1">
//                                 <h1 className="flex items-center text-gray-600 font-medium">
//                                     <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
//                                         <div>
//                                             <FaRegClock />
//                                         </div>
//                                     </IconContext.Provider>
//                                     <span className="text-lg pl-2"> Períodos</span>
//                                 </h1>
//                             </div>
//                             <div className="flex-1">
//                                 <nav className="font-sans w-full flex justify-end">
//                                     <ol className="flex list-reset text-grey-dark">
//                                         <li>
//                                             <InertiaLink
//                                                 href={route('home')}
//                                                 className="text-gray-500">
//                                                 Home
//                                             </InertiaLink>
//                                         </li>
//                                         <li><span className="mx-2">/</span></li>
//                                         <li className="text-gray-700">Períodos</li>
//                                     </ol>
//                                 </nav>
//                             </div>
//                         </div>

//                         <div className="flex p-4">

//                             <div className="flex-1">
//                                 {busca == true
//                                     ?
//                                     <BtnVoltar url={'periodos.index'} />
//                                     :
//                                     <BtnAdicionar btnOnclick={() => setIsModalPeriodo(true)} />
//                                 }

//                             </div>

//                             <div className="flex-1">
//                                 <FrmSearchDate url={'periodos.busca'} />
//                             </div>
//                         </div>

//                     </div>
//                     <section className="p-2overflow-x-auto">
//                         {success &&
//                             <div id="remalert" className="flex w-full mx-auto overflow-hidden items-center m-4 bg-green-500 border border-green-400 text-gray-600 rounded">
//                                 <div className="flex items-center justify-center w-12 h-12 bg-white">
//                                     <IconContext.Provider value={{ className: "text-2xl text-green-500" }}>
//                                         <div>
//                                             <FaRegCheckCircle />
//                                         </div>
//                                     </IconContext.Provider>
//                                 </div>
//                                 <div className="px-4 py-2 -mx-3">
//                                     <div className="mx-3">
//                                         <p className="text-sm text-white dark:text-gray-200">{success}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         }
//                         <table className="mt-2 min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-mdfont-semibold text-gray-500 tracking-wider">Período</th>
//                                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Início</th>
//                                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Término</th>
//                                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">N° Semanas</th>
//                                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Ativo</th>
//                                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider"></th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {periodos.data.map((per, index) => (
//                                     <tr key={index} className={(index % 2) == 0 ? "bg-gray-100 transition-colors duration-200 transform hover:bg-blue-100" : "bg-gray-50 transition-colors duration-200 transform hover:bg-blue-100"}>
//                                         <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{per.id_periodo}</span></td>
//                                         <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{dataFormatada(per.data_inicial)}</span></td>
//                                         <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{dataFormatada(per.desativacao)}</span></td>
//                                         <td className="px-6 py-2 whitespace-nowrap">
//                                             <span className="p-2 rounded-full bg-sgga-primary-b text-white font-medium shadow">
//                                                 {per.semana_final - per.semana_inicial}
//                                             </span>
//                                         </td>
//                                         <td className="w-20 px-6 py-2 whitespace-nowrap text-white text-sm font-semibold">
//                                             <button
//                                                 onClick={(e) => { activePeriodo(e, per.id_periodo, per.ativo) }}
//                                                 className={per.ativo ?
//                                                     "px-4 py-2 shadow tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
//                                                     :
//                                                     "px-4 py-2 shadow tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"}>
//                                                 {per.ativo ?
//                                                     <IconContext.Provider value={{ color: "text-white", className: "text-lg font-light" }}>
//                                                         <div>
//                                                             <FaCheck />
//                                                         </div>
//                                                     </IconContext.Provider>
//                                                     :
//                                                     <IconContext.Provider value={{ color: "text-white", className: "text-lg font-light" }}>
//                                                         <div>
//                                                             <FaTimes />
//                                                         </div>
//                                                     </IconContext.Provider>
//                                                 }
//                                             </button>
//                                         </td>
//                                         <td className="w-36 px-6 py-2 whitespace-nowrap">
//                                             <div className="flex items-end">
//                                                 <div className="pr-1">
//                                                     <button
//                                                         type="button"
//                                                         as="button"
//                                                         onClick={(e) => { setIsModalSemana(true); setIdPeriodo(per.id_periodo) }}
//                                                         className="px-4 py-2 shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
//                                                     >
//                                                         <div className="flex items-center">
//                                                             <IconContext.Provider value={{ color: "text-white", className: "text-sm" }}>
//                                                                 <div>
//                                                                     <FaPlus />
//                                                                 </div>
//                                                             </IconContext.Provider>
//                                                             <span className="pl-1 font-medium text-sm">Semanas</span>
//                                                         </div>
//                                                     </button>
//                                                 </div>
//                                                 <div className="">
//                                                     <button
//                                                         disabled={per.ativo ? true : false}
//                                                         onClick={(e) => { setIsModalDelete(true); setIdPeriodo(per.id_periodo) }}
//                                                         className={"px-4 py-2 shadow font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
//                                                             + (per.ativo ? " bg-red-400 cursor-default" : " bg-red-600")}
//                                                     >
//                                                         <div className="flex items-center">
//                                                             <IconContext.Provider value={{ color: "text-white", className: "text-sm" }}>
//                                                                 <div>
//                                                                     <FaTrash />
//                                                                 </div>
//                                                             </IconContext.Provider>
//                                                             <span className="pl-1 font-medium text-sm">Excluir</span>
//                                                         </div>
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                         </td>
//                                     </tr>
//                                 ))}
//                                 {periodos.data.length == 0 &&
//                                     <tr><td colSpan="6"><div className="flex justify-left bg-red-100 text-red-700 text-sm p-2">
//                                         <IconContext.Provider value={{ className: "text-2xl text-red-600" }}>
//                                             <div>
//                                                 <HiExclamation />
//                                             </div>
//                                         </IconContext.Provider>
//                                         <span className="pl-1 font-normal text-sm">Não há períodos a serem listados no momento. Utilize adicionar para adicionar um novo período!</span>
//                                     </div></td></tr>
//                                 }
//                             </tbody>
//                         </table>



//                     </section>
//                     {periodos.total > periodos.per_page &&
//                         <Pagination onPaginate={periodos} />
//                     }
//                 </div>
//                 {isModalPeriodo ?
//                     <MdlPeriodo onClose={() => setIsModalPeriodo(false)} />
//                     : null}

//                 {isModalSemana ?
//                     <MdlSemana onClose={() => setIsModalSemana(false)} onIdPeriodo={idPeriodo} />
//                     : null}
//                 {isModalDelete ?
//                     <MdlDelete onClose={() => setIsModalDelete(false)} onIdData={idPeriodo} url={'periodos.destroy'}>
//                         <div className="p-4 flex-auto justify-center">
//                             <div className="w-full text-center">
//                                 <p className="font-medium text-lg text-red-600">Têm certeza que deseja deletar o período?</p>
//                                 <p className="font-medium text-sm text-gray-500">Todos os dados referentes a este período serão excluídos!</p>
//                             </div>
//                         </div>
//                     </MdlDelete>
//                     : null}

//             </Template>
//         </Fragment>
//     )
// }

// export default Periodos
