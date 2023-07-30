import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useSelectedDay } from '../contexts/EventModalContext';
import { useMonthIndx, useSetMonthIndx } from '../contexts/MonthContext';
import getDayClass from '../utils/getDayClass';
import getMonthViewDates from '../utils/getMonthViewDates';

const smallCalendarHeader = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// TODO - research rendering of 'prev[state]' technique - does it really
// re-render the entire component?
export default function SmallCalendar() {
    const { monthIndx: globalMonthIndx } = useMonthIndx();
    const [prevGlobalMonthIndx, setPrevGlobalMonth] = useState(globalMonthIndx);
    const [localMonthIndx, setLocalMonthInx] = useState(globalMonthIndx);
    // FIXME - place fullMonth back at MonthContext
    const localFullMonth = useMemo(
        () => getMonthViewDates(localMonthIndx),
        [localMonthIndx],
    );

    // synchronizes smallCalendar when the globalMonthIndx changes
    if (prevGlobalMonthIndx !== globalMonthIndx) {
        setLocalMonthInx(globalMonthIndx);
        setPrevGlobalMonth(globalMonthIndx);
    }

    const handleNextMonth = () => {
        setLocalMonthInx(localMonthIndx + 1);
    };
    const handlePrevMonth = () => {
        setLocalMonthInx(localMonthIndx - 1);
    };

    return (
        <div className="w-full select-none text-xs">
            <div className="mb-2 flex items-center justify-between">
                <div className="ml-1 font-medium text-gray-600">
                    {dayjs().month(localMonthIndx).format(`MMMM [de] YYYY`)}
                </div>
                <div className="flex items-center">
                    <button
                        onClick={handlePrevMonth}
                        className="flex items-center justify-center rounded-full p-1 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <MdChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="flex items-center justify-center rounded-full p-1 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <MdChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
            </div>
            <div className="grid flex-1 grid-cols-7 gap-1 text-xxs">
                {smallCalendarHeader.map((dayWeekAbbr, dayWeekIndx) => {
                    return (
                        <div
                            key={dayjs().day(dayWeekIndx).format('dddd')}
                            className="flex h-5 w-5 items-center justify-center"
                            title={dayjs().day(dayWeekIndx).format('dddd')}
                        >
                            {dayWeekAbbr}
                        </div>
                    );
                })}
                {localFullMonth.map((date, indx) => {
                    return (
                        <Day
                            key={indx}
                            date={date}
                            monthIndx={localMonthIndx}
                        />
                    );
                })}
            </div>
        </div>
    );
}

interface IDay {
    date: dayjs.Dayjs;
    monthIndx: number;
}

function Day({ date, monthIndx }: IDay) {
    const { selectedDay, setSelectedDay } = useSelectedDay();
    const { setMonthIndx: setGlobalMonthIndx } = useSetMonthIndx();

    function handleSelectDay() {
        setSelectedDay(date);
        setGlobalMonthIndx(date.month());
    }

    return (
        <button
            className={`${getDayClass(date, monthIndx, selectedDay)} h-5 w-5`}
            onClick={handleSelectDay}
        >
            {date.format('D')}
        </button>
    );
}
