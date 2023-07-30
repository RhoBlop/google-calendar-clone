import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useMonthIndx } from '../contexts/MonthContext';
import getDayClass from '../utils/getDayClass';
import getMonthViewDates from '../utils/getMonthViewDates';

export default function CalendarView() {
    const { monthIndx } = useMonthIndx();
    const [prevActivatedMonth, setPrevActivatedMonth] = useState(monthIndx);
    const [animDirection, setAnimDirection] = useState<'next' | 'prev' | null>(
        null,
    );
    const fullMonth = useMemo(() => getMonthViewDates(monthIndx), [monthIndx]);

    if (monthIndx !== prevActivatedMonth) {
        if (monthIndx > prevActivatedMonth) {
            setAnimDirection('next');
        } else {
            setAnimDirection('prev');
        }
        setPrevActivatedMonth(monthIndx);
    }

    return (
        <div className="relative flex flex-1">
            <div
                className={`${
                    animDirection ? `${animDirection}-month-anim` : ''
                } absolute inset-0 grid grid-cols-7 border-l border-gray-300`}
                key={monthIndx}
            >
                {fullMonth.map((date, indx) => {
                    return (
                        <Day
                            date={date}
                            indx={indx}
                            monthIndx={monthIndx}
                            key={indx}
                        />
                    );
                })}
            </div>
        </div>
    );
}

interface IDay {
    date: dayjs.Dayjs;
    indx: number;
    monthIndx: number;
}

function Day({ date, indx, monthIndx }: IDay) {
    return (
        <div className={`flex border-b border-r border-gray-300 text-black `}>
            <div className="flex flex-1 flex-col items-center text-xs">
                {indx < 7 && (
                    <div className="-mb-1 mt-2 text-[11px] font-medium text-gray-500">
                        {date.format('ddd').toUpperCase()}.
                    </div>
                )}
                <button
                    className={`${getDayClass(
                        date,
                        monthIndx,
                    )} mt-1 h-[1.5rem] min-w-[1.5rem]`}
                >
                    {date.format('D')}{' '}
                    {date.date() === 1 && `${date.format('MMM')}.`}
                </button>
            </div>
        </div>
    );
}
