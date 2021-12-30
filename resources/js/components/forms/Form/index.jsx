import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { IoAlertCircle } from 'react-icons/io5';

export const DiForm = ({ children, onSubmit }) => {

    return (
        <Fragment>
            <form onSubmit={onSubmit} className='pt-2' autoComplete='off'>
                {children}
            </form>
        </Fragment>
    )
}

export const DiInput = ({ InpId, InpType, InpPlace, InpRef, InpError, InpLabel }) => {

    return (
        <Fragment>
            <div className="pt-2">
                <label>
                    <span className="text-gray-500">{InpLabel}</span>
                </label>
                <input
                    className={`${InpError === true ? 'border-red-200 rounded-t-md' : 'rounded-md'} form-input mt-1 text-gray-500 w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    id={InpId}
                    type={InpType}
                    placeholder={InpPlace}
                    ref={InpRef}
                />
                {InpError === true && <div className="p-2 border border-t-0 border-red-200 rounded-b-md text-sm flex items-center w-full bg-yellow-100 text-red-500">
                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                        <div>
                            <IoAlertCircle />
                        </div>
                        <span className="ml-2 font-medium">
                            {InpId === 'password_confirmation' ?
                                <div>
                                    O campo {InpLabel} deve ser preenchido e suas senhas devem ser iguais!
                                </div>
                                :
                                <div>
                                    {InpId === 'email' ?
                                        <div>
                                            O campo {InpLabel} deve ser preenchido ser e-mail válido!
                                        </div>
                                        :
                                        <div>
                                            O campo {InpLabel} deve ser preenchido!
                                        </div>
                                    }

                                </div>
                            }

                        </span>
                    </IconContext.Provider>

                </div>
                }

            </div>
        </Fragment>
    )

}

export const DiCombobox = ({ CombId, CombRef, CombError, CombLabel, CombData, CombLiga }) => {

    return (
        <Fragment>
            <div className="pt-2">
                <label>
                    <span className="text-gray-500">{CombLabel}</span>
                </label>
                <select
                    className={`${CombError === true ? 'border-red-200 rounded-t-md' : 'rounded-md'} form-input mt-1 text-gray-500 w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    id={CombId}
                    ref={CombRef}
                >
                    <option value="">Selecione {CombLiga ? CombLiga : 'a'} {CombLabel}</option>
                    {CombData.map((cat, index) => (
                        <Fragment key={index}>
                            
                            <option value={cat.id_category}>{cat.categoryname}</option>

                            {cat.sub_categories &&
                                cat.sub_categories.map((Scat, Sindex) => (
                                    <option key={Sindex} value={Scat.id_category}>&#8212; {Scat.categoryname}</option>
                                ))
                            }

                        </Fragment>

                    ))}
                </select>
                {CombError === true && <div className="p-2 border border-t-0 border-red-200 rounded-b-md text-sm flex items-center w-full bg-yellow-100 text-red-500">
                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                        <div>
                            <IoAlertCircle />
                        </div>
                        <span className="ml-2 font-medium">O campo {CombLabel} deve ser preenchido!</span>
                    </IconContext.Provider>

                </div>
                }

            </div>
        </Fragment>
    )

}

export const DiCheckbox = ({ CheckId, CheckRef, CheckError, CheckLabel }) => {

    return (
        <Fragment>
            <div className="pt-4">
                <input
                    type="checkbox"
                    className={`${CheckError === true ? 'border-red-200' : ''} form-checkbox rounded-sm text-gray-500 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    id={CheckId}
                    ref={CheckRef}
                />
                <label>
                    <span className="text-gray-500 ml-2">{CheckLabel}</span>
                </label>

                {CheckError === true && <div className="p-2 border border-t-0 border-red-200 rounded-b-md text-sm flex items-center w-full bg-yellow-100 text-red-500">
                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                        <div>
                            <IoAlertCircle />
                        </div>
                        <span className="ml-2 font-medium">O campo {CheckLabel} deve ser preenchido!</span>
                    </IconContext.Provider>

                </div>
                }

            </div>
        </Fragment>
    )

}

export const DiTextarea = ({ TextId, TextRef, TextError, TextLabel, TextRows }) => {
    return (
        <Fragment>
            <div className="pt-2">
                <label>
                    <span className="text-gray-500">{TextLabel}</span>
                </label>
                <textarea
                    className={`${TextError === true ? 'border-red-200 rounded-t-md' : 'rounded-md'} form-input mt-1 text-gray-500 w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    ref={TextRef}
                    id={TextId}
                    rows={TextRows}
                >
                </textarea>

                {TextError === true && <div className="p-2 border border-t-0 border-red-200 rounded-b-md text-sm flex items-center w-full bg-yellow-100 text-red-500">
                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                        <div>
                            <IoAlertCircle />
                        </div>
                        <span className="ml-2 font-medium">O campo {TextLabel} deve ser preenchido!</span>
                    </IconContext.Provider>

                </div>
                }

            </div>
        </Fragment>
    )
}

export const DiFile = ({ FileLabel, FileId, FileType, FileSize, FileRef, FileOnChange, FileError }) => {
    return (
        <Fragment>
            <div className="pt-2">
                <label>
                    <span className="text-gray-500">{FileLabel}</span>
                </label>
                <input
                    className={`${FileError === true ? 'border-red-200' : ''} form-input mt-1 text-gray-500 w-full`}
                    type="file"
                    id={FileId}
                    ref={FileRef}
                    onChange={FileOnChange}
                />

                {FileError === true && <div className="p-2 border border-red-200 rounded-b-md text-sm flex items-center w-full bg-yellow-100 text-red-500">
                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                        <div>
                            <IoAlertCircle />
                        </div>
                        <span className="ml-2 font-medium">O campo {FileLabel} deve ser do tipo {FileType} e com {FileSize}!</span>
                    </IconContext.Provider>

                </div>
                }

            </div>
        </Fragment>
    )
}

export const DiEmpty = ({ children, EmptyLabel, EmptyError }) => {
    return (
        <Fragment>
            <div className="pt-2">
                <label>
                    <span className="text-gray-500">{EmptyLabel}</span>
                </label>

                {children}

                {EmptyError === true && <div className="p-2 border border-red-200 rounded-b-md text-sm flex items-center w-full bg-yellow-100 text-red-500">
                    <IconContext.Provider value={{ color: "text-white", className: "text-xl" }}>
                        <div>
                            <IoAlertCircle />
                        </div>
                        <span className="ml-2 font-medium">O campo {EmptyLabel} deve ser preenchido!</span>
                    </IconContext.Provider>

                </div>
                }

            </div>
        </Fragment>
    )
}
