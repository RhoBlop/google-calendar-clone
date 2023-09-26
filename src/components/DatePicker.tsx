import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import SmallCalendar from './SmallCalendar';
import { useOnClickOutside } from '../utils/useOnClickOutside';

interface DatePicker {
    date: dayjs.Dayjs;
    handleSelectDate: (date: dayjs.Dayjs) => void;
}

export default function DatePicker({ date, handleSelectDate }: DatePicker) {
    const [isActive, setIsActive] = useState(false);
    const datePickerRef = useRef<HTMLInputElement>(null);
    const handleHideCalendar = useCallback(() => setIsActive(false), []);
    useOnClickOutside(datePickerRef, handleHideCalendar, isActive);

    const { monthIndx, handlePrevArrow, handleNextArrow, handleDayClick } =
        useDatePickerCalendar({
            date,
            handleHideCalendar,
            handleSelectDate,
        });

    return (
        <div className="relative" ref={datePickerRef}>
            <div
                className={`${
                    isActive
                        ? 'border-blue-500 bg-gray-100'
                        : 'border-transparent bg-transparent'
                } cursor-text rounded-sm border-b-[3px] px-2 py-1 transition-colors ease-in hover:bg-gray-100`}
                onClick={() => {
                    setIsActive(true);
                }}
            >
                {date.isSame(dayjs(), 'year')
                    ? date.format('dddd, D [de] MMMM')
                    : date.format('dddd, D [de] MMMM [de] YYYY')}
            </div>

            {isActive && (
                <div className="date-picker-shadow absolute top-10 z-50 w-52 rounded-sm bg-white p-2">
                    <SmallCalendar
                        monthIndx={monthIndx}
                        propSelectedDate={date}
                        handleDayClick={handleDayClick}
                        handleNextArrow={handleNextArrow}
                        handlePrevArrow={handlePrevArrow}
                    />
                </div>
            )}
        </div>
    );
}

interface IDatePickerCalendar {
    date: dayjs.Dayjs;
    handleSelectDate: (date: dayjs.Dayjs) => void;
    handleHideCalendar: () => void;
}

const useDatePickerCalendar = ({
    date,
    handleSelectDate,
    handleHideCalendar,
}: IDatePickerCalendar) => {
    const [monthIndx, setMonthIndx] = useState(date.month());

    const handlePrevArrow = () => {
        setMonthIndx((prev) => prev - 1);
    };

    const handleNextArrow = () => {
        setMonthIndx((prev) => prev + 1);
    };

    const handleDayClick = (date: dayjs.Dayjs) => {
        handleSelectDate(date);
        handleHideCalendar();
    };

    return {
        monthIndx,
        handlePrevArrow,
        handleNextArrow,
        handleDayClick,
    };
};
