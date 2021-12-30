import React, { Fragment, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaCheck, FaPlus, FaRegCheckCircle, FaRegClock, FaTimes, FaTrash } from 'react-icons/fa';
import { IoHome, IoTime } from 'react-icons/io5';
import Template from '../../components/template'
import BtnAdicionar from '../../components/botoes/adicionar';
import FrmSearchDate from '../../components/Forms/searchdate';
import MdlPeriodo from '../../components/Modal/periodo';
import MdlSemana from '../../components/Modal/semana';
import moment from 'moment';
import MdlDelete from '../../components/Modal/delete';
import { HiExclamation } from 'react-icons/hi';
import { Inertia } from '@inertiajs/inertia';
import Pagination from '../../components/pagination';
import BtnVoltar from '../../components/botoes/voltar';
import { InertiaLink } from '@inertiajs/inertia-react';
import { BoxBody, BoxFull, BoxHeader, BoxSearch, Breadcumb, IconTitle } from '../../components/Boxes';
import { AddButton } from '../../components/Buttons';
import FormSearch from '../../components/Forms/FormSearch';
import { TTable, THead, TRCol, THRow, TBody, TDRow } from '../../components/Tables';
import DateFormat from '../../components/DateFormat';
const Periodos = ({ periodos, success, error, busca }) => {

    const dataFormatada = (dataRaw) => {
        return moment(dataRaw).format('DD/MM/YYYY');
    }

    const [isModalPeriodo, setIsModalPeriodo] = useState(false);
    const [isModalSemana, setIsModalSemana] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [idPeriodo, setIdPeriodo] = useState();

    const activePeriodo = (e, idp, ativo) => {
        e.preventDefault;
        const idperiodo = idp;

        Inertia.post(route('periodos.ativaperiodo'), { _methodo: 'put', idperiodo, ativo });
    }

    return (

        <Template>
            <Fragment>
                <BoxFull>
                    <BoxHeader>
                        <IconTitle
                            IconValue={<IoTime />}
                            TitleValue={'Periodos'}
                        />
                        <Breadcumb
                            IconBread={<IoHome />}
                            LinksBread={
                                [
                                    { 'name': 'Periodos', 'url': 'periodos.index', 'active': true }
                                ]
                            }
                        />
                    </BoxHeader>

                    <BoxSearch>
                        <AddButton url={'periodos.create'} />
                        <FormSearch place={'Buscar por periodo'} url={'periodos.index'} />
                    </BoxSearch>

                    <BoxBody>
                        {error &&
                            <ErrorMessage message={error} />
                        }
                        {success &&
                            <SuccessMessage message={success} />
                        }
                        <TTable>
                            <THead>
                                <TRCol>
                                    <THRow classValue='text-left'>
                                        ID
                                    </THRow>
                                    <THRow classValue='text-left'>
                                        Categoria
                                    </THRow>
                                    <THRow classValue='text-left'>
                                        Slug
                                    </THRow>
                                    <THRow classValue='text-left'>
                                        Postagens
                                    </THRow>
                                    <THRow classValue='text-left'>
                                        Criação
                                    </THRow>
                                    <THRow classValue='text-left'>
                                        Situação
                                    </THRow>
                                    <THRow classValue='text-left w-60'>
                                        Ações
                                    </THRow>
                                </TRCol>
                            </THead>
                            <TBody>
                                {periodos.data.map((row, index) => (
                                    <Fragment key={index}>
                                        <TRCol classValue={`hover:bg-blue-50 ${(index % 2) == 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                                            <TDRow>
                                                {row.id_category}
                                            </TDRow>
                                            <TDRow>
                                                {row.categoryname}
                                            </TDRow>
                                            <TDRow>
                                                {row.slug}
                                            </TDRow>
                                            <TDRow>
                                                {row.slug}
                                            </TDRow>
                                            <TDRow>
                                                <DateFormat dateRaw={row.created_at} />
                                            </TDRow>
                                            <TDRow>
                                                <TDLabelActive value={row.active} />
                                            </TDRow>
                                            <TDRow>
                                                <div className='flex items-center justify-end'>
                                                    <EditButton url={'categorias.edit'} param={row.id_category} />
                                                    <DeleteButton url={'categorias.destroy'} param={row.id_category} titleModal="categoria" />
                                                </div>
                                            </TDRow>
                                        </TRCol>

                                    </Fragment>
                                ))}
                            </TBody>
                        </TTable>

                    </BoxBody>

                    <Pagination data={categories} />
                </BoxFull>
                {/* {isModalPeriodo ?
                    <MdlPeriodo onClose={() => setIsModalPeriodo(false)} />
                    : null}

                {isModalSemana ?
                    <MdlSemana onClose={() => setIsModalSemana(false)} onIdPeriodo={idPeriodo} />
                    : null} */}


            </Fragment>
        </Template>

    )
}

export default Periodos;
