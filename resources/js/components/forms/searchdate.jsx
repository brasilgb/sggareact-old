import React, { Fragment, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { Inertia } from '@inertiajs/inertia';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

const FrmSearchDate = ({url}) => {
    const [startDate, setStartDate] = useState(new Date());

    const dateSearch = moment(startDate).format("YYYY-MM-DD");

    const searchData = (e) => {
        e.preventDefault();
        const search = dateSearch;
        Inertia.post(route(url), { search });
    };

    return (
        <Fragment>
            <form onSubmit={searchData} autoComplete="of">
                <div className="relative mt-1">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                        className="px-4 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none focus:ring focus:ring-blue-300 w-full"
                    />
                    <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
                        <IconContext.Provider value={{ color: "text-white", className: "text-lg mt-1" }}>
                            <div>
                                <FaSearch />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
            </form>
        </Fragment>
    )
}

export default FrmSearchDate