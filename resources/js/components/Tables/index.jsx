import React, { Fragment } from 'react'
import { IconContext } from 'react-icons'
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5'

export const TTable = ({ children }) => {
    return (
        <Fragment>
            <table className='w-full'>
                {children}
            </table>
        </Fragment>
    )

}

export const THead = ({ children }) => {
    return (
        <Fragment>
            <thead>
                {children}
            </thead>
        </Fragment>
    )

}

export const TBody = ({ children }) => {
    return (
        <Fragment>
            <tbody>
                {children}
            </tbody>
        </Fragment>
    )

}

export const TRCol = ({ children, classValue }) => {
    return (
        <Fragment>
            <tr className={`${classValue}`}>
                {children}
            </tr>
        </Fragment>
    )

}

export const THRow = ({ children, classValue }) => {
    return (
        <Fragment>
            <th className={`${classValue} p-2 border-b border-t border-gray-200 bg-gray-300`}>
                {children}
            </th>
        </Fragment>
    )

}

export const TDRow = ({ children }) => {
    return (
        <Fragment>
            <td className='p-2 border-b'>
                {children}
            </td>
        </Fragment>
    )

}

export const TDLabelActive = ({ value }) => {
    return (
        <Fragment>
            <span title={value === 1 ? 'Ativa' : 'Inativa'} className={`text-sm py-2 w-10 block text-center rounded-md border-2 border-white shadow ${value === 1 ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"} `}>
            {value === 1 ? 'A' : 'I'}
            </span>
        </Fragment>
    )

}