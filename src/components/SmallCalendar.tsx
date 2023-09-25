import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import getDayClass from '../utils/getDayClass';
import getMonthDates from '../utils/getMonthDates';
import { convertToMonthAndYear } from '../utils/dateConvertions';

interface ISmallCalendar {
    monthIndx: number;
    propSelectedDate?: dayjs.Dayjs;
    handlePrevArrow: () => void;
    handleNextArrow: () => void;
    handleDayClick: (date: dayjs.Dayjs) => void;
}

const smallCalendarHeader = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// TODO - Change selected day based on props
export default function SmallCalendar({
    monthIndx,
    propSelectedDate,
    handlePrevArrow,
    handleNextArrow,
    handleDayClick,
}: ISmallCalendar) {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    const localFullMonth = useMemo(() => getMonthDates(monthIndx), [monthIndx]);

    function handleSelectDate(date: dayjs.Dayjs) {
        handleDayClick(date);
        setSelectedDate(date);
    }

    return (
        <div className="w-full select-none text-sm">
            <div className="mb-2 flex items-center justify-between">
                <div className="ml-1 font-medium text-gray-600">
                    {convertToMonthAndYear(dayjs().month(monthIndx))}
                </div>
                <div className="flex items-center">
                    <button
                        onClick={handlePrevArrow}
                        className="flex items-center justify-center rounded-full p-1 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <MdChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={handleNextArrow}
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
                            monthIndx={monthIndx}
                            isSelected={
                                propSelectedDate
                                    ? date.isSame(propSelectedDate)
                                    : date.isSame(selectedDate, 'day')
                            }
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
    // FIXME date selections on future years are broken (because .month() gets the monthIndex starting from 0 everytime)
    // need to do some calculations if date is not from current year

    return (
        <button
            className={`${getDayClass(date, monthIndx, isSelected)} h-5 w-5`}
            onClick={() => handleSelectDate(date)}
        >
            {date.format('D')}
        </button>
    );
}
