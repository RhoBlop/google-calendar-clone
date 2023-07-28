import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Menu } from 'react-feather';
import CalendarLogo from '../assets/CalendarLogo.png';
import { useMonthValues, useSetMonthIndx } from '../contexts/MonthContext';

const currentMonthIndx = dayjs().month();

interface ICalendarheader {
    toggleSidebar: () => void;
}

export default function CalendarHeader({ toggleSidebar }: ICalendarheader) {
    const { monthIndx } = useMonthValues();
    const setMonthIndx = useSetMonthIndx();

    const handleNextMonth = () => {
        setMonthIndx(monthIndx + 1);
    };
    const handlePrevMonth = () => {
        setMonthIndx(monthIndx - 1);
    };
    const handleToday = () => {
        currentMonthIndx !== monthIndx && setMonthIndx(currentMonthIndx);
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-300 p-2">
            <div className="flex items-center">
                <div className="p-3">
                    <button
                        onClick={toggleSidebar}
                        className="rounded-full p-3 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <Menu size={20} className="text-gray-600" />
                    </button>
                </div>
                <div className="mr-12 flex select-none items-center gap-2">
                    <img
                        src={`https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_28_2x.png`}
                        onError={(e) => {
                            const img = e.currentTarget;
                            img.onerror = null;
                            img.src = CalendarLogo;
                        }}
                        alt="Google Calendar Logo"
                        className="h-10"
                    />
                    <span className="text-xl font-normal text-gray-800">
                        Agenda
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleToday}
                        className="rounded border border-gray-200 bg-transparent px-4 py-2 text-sm font-medium text-gray-800 transition-colors duration-150 hover:bg-gray-50"
                    >
                        Hoje
                    </button>
                    <div className="flex items-center">
                        <button
                            onClick={handlePrevMonth}
                            className="flex items-center justify-center rounded-full p-2 transition-colors duration-150 hover:bg-gray-100"
                        >
                            <ChevronLeft
                                className="text-gray-600"
                                size={20}
                                strokeWidth={2.5}
                            />
                        </button>
                        <button
                            onClick={handleNextMonth}
                            className="flex items-center justify-center rounded-full p-2 transition-colors duration-150 hover:bg-gray-100"
                        >
                            <ChevronRight
                                className="text-gray-600"
                                size={20}
                                strokeWidth={2.5}
                            />
                        </button>
                    </div>
                    <span className="text-xl font-normal text-gray-800">
                        {dayjs().month(monthIndx).format(`MMMM [de] YYYY`)}
                    </span>
                </div>
            </div>
            <div></div>
        </header>
    );
}
