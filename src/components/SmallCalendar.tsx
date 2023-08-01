import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useEventForm } from '../contexts/EventModalContext';
import { useGlobalMonth, useSmCalMonth } from '../contexts/MonthContext';
import getDayClass from '../utils/getDayClass';
import getMonthDates from '../utils/getMonthDates';

const smallCalendarHeader = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function SmallCalendar() {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const { setGlobalMonth } = useGlobalMonth();
    const { smCalMonthIndx, setSmCalMonthIndx } = useSmCalMonth();
    const { setFormEventInterval } = useEventForm();

    const localFullMonth = useMemo(
        () => getMonthDates(smCalMonthIndx),
        [smCalMonthIndx],
    );

    const handleNextMonth = () => {
        setSmCalMonthIndx((prevState) => prevState + 1);
    };
    const handlePrevMonth = () => {
        setSmCalMonthIndx((prevState) => prevState - 1);
    };

    function handleSelectDate(date: dayjs.Dayjs) {
        const dateMonthIndx = date.month();

        setGlobalMonth((prevState) => {
            let newAnimDirection: typeof prevState.animDirection = null;

            if (dateMonthIndx > prevState.globalMonthIndx) {
                newAnimDirection = 'next';
            } else if (dateMonthIndx < prevState.globalMonthIndx) {
                newAnimDirection = 'prev';
            }

            return {
                ...prevState,
                globalMonthIndx: dateMonthIndx,
                animDirection: newAnimDirection,
            };
        });
        setSmCalMonthIndx(dateMonthIndx);
        setSelectedDate(date);
        setFormEventInterval({
            eventStart: date,
            eventEnd: date,
        });
    }

    return (
        <div className="w-full select-none text-sm">
            <div className="mb-2 flex items-center justify-between">
                <div className="ml-1 font-medium text-gray-600">
                    {dayjs().month(smCalMonthIndx).format(`MMMM [de] YYYY`)}
                </div>
                <div className="flex items-center">
                    <button
                        onClick={handlePrevMonth}
                        className="flex items-center justify-center rounded-full p-1 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <MdChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="flex items-center justify-center rounded-full p-1 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <MdChevronRight className="h-5 w-5 text-gray-600" />
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
                            monthIndx={smCalMonthIndx}
                            isSelected={date.isSame(selectedDate, 'day')}
                            handleSelectDate={handleSelectDate}
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
    isSelected: boolean;
    handleSelectDate: (date: IDay['date']) => void;
}

function Day({ date, monthIndx, isSelected, handleSelectDate }: IDay) {
    return (
        <button
            className={`${getDayClass(date, monthIndx, isSelected)} h-5 w-5`}
            onClick={() => handleSelectDate(date)}
        >
            {date.format('D')}
        </button>
    );
}
