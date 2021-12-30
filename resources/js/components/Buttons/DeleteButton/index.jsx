import React, { Fragment, useState } from 'react';
import { IoTrash, IoWarning } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import Modal from '../../Modal';

const DeleteButton = ({ url, param, titleModal, titleLigacao }) => {
    const [idCategory, setIdCategory] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <Fragment>
            <button
                onClick={(e) => { setIsModalVisible(true); setIdCategory(param) }}
                className="flex items-center justify-center py-2 px-4 bg-red-500 border-2 border-white text-gray-50 rounded-md shadow-md hover:bg-red-600 transition duration-400"
            >
                <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                    <div>
                        <IoTrash />
                    </div>
                    <span className="ml-2 font-medium">Excluir</span>
                </IconContext.Provider>
            </button>
            {isModalVisible ?
                <Modal onClose={() => setIsModalVisible(false)} onIdCategory={idCategory} url={url}>
                    <div className='flex items-center justify-start border-b border-gray-200 py-2 px-4 bg-gray-100 rounded-t-md'>
                        <IconContext.Provider value={{ color: "text-white", className: "text-2xl text-red-500" }}>
                            <div>
                                <IoWarning />
                            </div>
                            <span className="ml-2 font-medium text-lg text-gray-600">Excluir {titleModal}</span>
                        </IconContext.Provider>
                    </div>
                    <div className='p-4'>
                        <h2 className='text-base'>Têm certeza que deseja excluir est{titleLigacao=='e'?titleLigacao:'a'} {titleModal} e todos os dados relacionados?</h2>
                    </div>
                </Modal>
                : null}
        </Fragment>
    )
}

export default DeleteButton;
