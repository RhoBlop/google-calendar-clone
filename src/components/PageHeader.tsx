import dayjs from 'dayjs';
import { MdChevronLeft, MdChevronRight, MdMenu } from 'react-icons/md';
import { googleLogoUrl } from '../App';
import CalendarLogo from '../assets/CalendarLogo.png';
import { useGlobalMonth, useSmCalMonth } from '../contexts/MonthContext';

const todaysMonthIndx = dayjs().month();

interface ICalendarheader {
    toggleSidebar: () => void;
}

export default function CalendarHeader({ toggleSidebar }: ICalendarheader) {
    const {
        globalMonth: { globalMonthIndx },
        setGlobalMonth,
    } = useGlobalMonth();
    const { setSmCalMonthIndx } = useSmCalMonth();

    const handleNextMonth = () => {
        setGlobalMonth((prevState) => {
            return {
                ...prevState,
                globalMonthIndx: prevState.globalMonthIndx + 1,
                animDirection: 'next',
            };
        });
        setSmCalMonthIndx((prevState) => prevState + 1);
    };
    const handlePrevMonth = () => {
        setGlobalMonth((prevState) => {
            return {
                ...prevState,
                globalMonthIndx: prevState.globalMonthIndx - 1,
                animDirection: 'prev',
            };
        });
        setSmCalMonthIndx((prevState) => prevState - 1);
    };
    const handleToday = () => {
        setGlobalMonth((prevState) => ({
            ...prevState,
            globalMonthIndx: todaysMonthIndx,
            animDirection: null,
        }));
        setSmCalMonthIndx(todaysMonthIndx);
    };

    return (
        <header className="flex h-14 items-center justify-between border-b border-gray-300 p-2">
            <div className="flex items-center">
                <div className="p-2">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center justify-center rounded-full p-3 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <MdMenu className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
                <div className="mr-12 flex select-none items-center gap-2">
                    <img
                        src={googleLogoUrl}
                        onError={(e) => {
                            const img = e.currentTarget;
                            img.onerror = null;
                            img.src = CalendarLogo;
                        }}
                        alt="Google Calendar Logo"
                        className="h-9"
                    />
                    <span className="text-xl font-normal text-gray-700">
                        Agenda
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleToday}
                        className="rounded border border-gray-200 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
                    >
                        Hoje
                    </button>
                    <div className="flex items-center">
                        <button
                            onClick={handlePrevMonth}
                            className="flex items-center justify-center rounded-full p-2 transition-colors duration-150 hover:bg-gray-100"
                        >
                            <MdChevronLeft className="h-5 w-5 text-gray-600" />
                        </button>
                        <button
                            onClick={handleNextMonth}
                            className="flex items-center justify-center rounded-full p-2 transition-colors duration-150 hover:bg-gray-100"
                        >
                            <MdChevronRight className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                    <span className="text-xl font-normal text-gray-700">
                        {dayjs()
                            .month(globalMonthIndx)
                            .format(`MMMM [de] YYYY`)}
                    </span>
                </div>
            </div>
            <div></div>
        </header>
    );
}
