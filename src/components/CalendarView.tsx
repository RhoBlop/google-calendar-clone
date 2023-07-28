import dayjs from 'dayjs';
import { useState } from 'react';
import { useMonthValues } from '../contexts/MonthContext';

export default function CalendarView() {
    const { fullMonth, monthIndx } = useMonthValues();
    const [prevActivatedMonth, setPrevActivatedMonth] = useState(monthIndx);
    const [animDirection, setAnimDirection] = useState<'next' | 'prev' | null>(
        null,
    );

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
        <div className={`flex border-b border-r border-gray-300 text-black`}>
            <div className="flex flex-1 flex-col items-center text-xs">
                {indx < 7 && (
                    <div className="-mb-1 mt-2 text-[11px] font-medium text-gray-500">
                        {date.format('ddd').toUpperCase()}.
                    </div>
                )}
                <button className={getDayClass(date, monthIndx)}>
                    {date.format('D')}{' '}
                    {date.date() === 1 && `${date.format('MMM')}.`}
                </button>
            </div>
        </div>
    );
}

function getDayClass(date: dayjs.Dayjs, activeMonthIndx: number) {
    const today = dayjs();
    const defaultClass = `flex h-6 min-w-[1.5rem] items-center justify-center rounded-full mt-1`;
    const conditionalClass = !date.isSame(
        dayjs().month(activeMonthIndx),
        'month',
    )
        ? 'text-gray-300 hover:bg-gray-100'
        : date.isSame(today, 'day')
        ? 'bg-blue-500 text-white hover:bg-blue-600'
        : 'hover:bg-gray-100';

    return defaultClass + ' ' + conditionalClass;
}
