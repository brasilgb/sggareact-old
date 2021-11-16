import React, { Fragment, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaCubes, FaRegCheckCircle } from 'react-icons/fa';
import Template from '../../components/template'
import BtnAdicionar from '../../components/botoes/adicionar';
import FrmSearchValue from '../../components/forms/searchvalue';
import moment from 'moment';
import MdlDelete from '../../components/modal/delete';
import { HiExclamation } from 'react-icons/hi';
import Pagination from '../../components/pagination';
import BtnVoltar from '../../components/botoes/voltar';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import BtnEdit from '../../components/botoes/edit';
import BtnDelete from '../../components/botoes/delete';
import BtnCapitalizar from '../../components/botoes/capitalizar';
import MdlCapitalizar from '../../components/modal/capitalizar';

const Lotes = ({ lotes, success, busca }) => {

    const dataFormatada = (dataRaw) => {
        return moment(dataRaw).format('DD/MM/YYYY');
    }
    const [idLote, setIdLote] = useState();
    const [dtFemea, setDtFemea] = useState();
    const [dtMacho, setDtMacho] = useState();

    const [isModalCapitalizar, setIsModalCapitalizar] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);

    const onAddLote = (e) => {
        e.preventDefault;
        Inertia.get(route('lotes.create'));
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
                                        <li className="text-gray-700">Lotes</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="flex p-4">

                            <div className="flex-1">
                                {busca == true
                                    ?
                                    <BtnVoltar url={'lotes.index'} />
                                    :
                                    <BtnAdicionar btnOnclick={(e) => onAddLote(e)} />
                                }
                            </div>

                            <div className="flex-1">
                                <FrmSearchValue url={'lotes.busca'} placeHolder={'Pesquisar por lote'} className="uppercase" />
                            </div>
                        </div>

                    </div>
                    <section className="p-2 overflow-x-auto">

                        {success &&
                            <div id="remalert" className="flex w-full mx-auto overflow-hidden items-center m-4 bg-green-500 border border-green-400 text-gray-600 rounded">
                                <div className="flex items-center justify-center w-12 h-12 bg-white">
                                    <IconContext.Provider value={{ className: "text-2xl text-green-500" }}>
                                        <div>
                                            <FaRegCheckCircle />
                                        </div>
                                    </IconContext.Provider>
                                </div>
                                <div className="px-4 py-2 -mx-3">
                                    <div className="mx-3">
                                        <p className="text-sm text-white dark:text-gray-200">{success}</p>
                                    </div>
                                </div>
                            </div>
                        }

                        <table className="mt-2 min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Lote</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Fêmeas</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Capitalizadas/Data</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Machos</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Capitalizados/Data</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Total Aves</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Aviários</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider">Cadastro</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                {lotes.data.map((lt, index) => (
                                    <tr key={index} className={(index % 2) == 0 ? "bg-gray-100 transition-colors duration-200 transform hover:bg-blue-100" : "bg-gray-50 transition-colors duration-200 transform hover:bg-blue-100"}>
                                        <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{lt.id_lote}</span></td>
                                        <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{lt.lote}</span></td>
                                        <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{lt.femea}</span></td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            {lt.femea_capitalizada ?
                                                <div className="py-2 flex items-center justify-center bg-blue-400 rounded-md shadow">
                                                    <span className="text-sm text-gray-100">{lt.femea_capitalizada}</span>
                                                    <span className="text-sm text-gray-500 font-medium px-2">/</span>
                                                    <span className="text-sm text-gray-100">{dataFormatada(lt.data_femea_capitalizada)}</span>
                                                </div>
                                                :
                                                <div className="py-2 flex items-center justify-center bg-red-400 rounded-md shadow">
                                                    <span className="text-sm text-gray-100">Não Capitalizada</span>
                                                </div>
                                            }
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{lt.macho}</span></td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            {lt.macho_capitalizado ?
                                                <div className="py-2 flex items-center justify-center bg-blue-400 rounded-md shadow">
                                                    <span className="text-sm text-gray-100">{lt.macho_capitalizado}</span>
                                                    <span className="text-sm text-gray-500 font-medium px-2">/</span>
                                                    <span className="text-sm text-gray-100">{dataFormatada(lt.data_macho_capitalizado)}</span>
                                                </div>
                                                :
                                                <div className="py-2 flex items-center justify-center bg-red-400 rounded-md shadow">
                                                    <span className="text-sm text-gray-100">Não Capitalizado</span>
                                                </div>
                                            }
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{lt.macho + lt.femea}</span></td>
                                        <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{lt.aviarios.length}</span></td>
                                        <td className="px-6 py-2 whitespace-nowrap"><span className="text-gray-600">{dataFormatada(lt.created_at)}</span></td>
                                        <td className="w-20 px-6 py-2 whitespace-nowrap text-white text-sm font-semibold">
                                            <div className="flex items-end">
                                                <div>
                                                    <BtnCapitalizar btnOnClick={() => { setIsModalCapitalizar(true); setIdLote(lt.id_lote); setDtFemea(lt.data_femea_capitalizada); setDtMacho(lt.data_macho_capitalizado) }} />
                                                </div>
                                                <div className="px-1">
                                                    <BtnEdit btnOnclick={route('lotes.edit', lt.id_lote)} />
                                                </div>
                                                <div>
                                                    <BtnDelete btnOnclick={() => { setIsModalDelete(true); setIdLote(lt.id_lote) }} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {lotes.data.length == 0 &&
                                    <tr>
                                        <td colSpan="10">
                                            <div className="flex justify-left bg-red-100 text-red-700 text-sm p-2">
                                                <IconContext.Provider value={{ className: "text-2xl text-red-600" }}>
                                                    <div>
                                                        <HiExclamation />
                                                    </div>
                                                </IconContext.Provider>
                                                <span className="pl-1 font-normal text-sm">Não há Lotes a serem listados no momento. Utilize adicionar para adicionar um novo ltíodo!</span>
                                            </div>
                                        </td>
                                    </tr>
                                }

                            </tbody>
                        </table>

                    </section>
                    {lotes.total > lotes.per_page &&
                        <Pagination onPaginate={lotes} />
                    }
                </div>

                {isModalDelete ?
                    <MdlDelete onClose={() => setIsModalDelete(false)} onIdData={idLote} url={'lotes.destroy'}>
                        <div className="p-4 flex-auto justify-center">
                            <div className="w-full text-center">
                                <p className="font-medium text-lg text-red-600">Têm certeza que deseja deletar o lote?</p>
                                <p className="font-medium text-sm text-gray-500">Todos os dados referentes a este lote serão excluídos!</p>
                            </div>
                        </div>
                    </MdlDelete>
                    : null}

                {isModalCapitalizar ?
                    <MdlCapitalizar onClose={() => setIsModalCapitalizar(false)} onIdLote={idLote} onLote={lotes} onDtFemea={dtFemea} onDtMacho={dtMacho} />
                    : null}
            </Template>
        </Fragment>
    )
}

export default Lotes
