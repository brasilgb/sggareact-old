import { format } from 'date-fns';

const DateFormat = ({ dateRaw }) => {
    return (
        format(new Date(dateRaw), 'dd/MM/yyyy')
    )
};

export default DateFormat;
