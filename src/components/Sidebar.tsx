import dayjs from 'dayjs';
import { useEventForm } from '../contexts/EventModalContext';
import { useGlobalMonth, useSmCalMonth } from '../contexts/MonthContext';
import SmallCalendar from './SmallCalendar';

interface ISidebar {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: ISidebar) {
    return (
        <div
            className={`${
                isOpen ? 'ml-0' : '-ml-64 mr-2'
            } w-64 overflow-hidden transition-all duration-300 ease-in`}
        >
            <div className="mt-16 flex flex-col items-center p-6">
                <SideBarCallendar />
                {/* <LabelsSection /> */}
            </div>
        </div>
    );
}

function SideBarCallendar() {
    const { handleSetGlobalMonth } = useGlobalMonth();
    const { smCalMonthIndx, setSmCalMonthIndx } = useSmCalMonth();
    const { setEventFormData } = useEventForm();

    const handleNextMonth = () => {
        setSmCalMonthIndx((prevState) => prevState + 1);
    };
    const handlePrevMonth = () => {
        setSmCalMonthIndx((prevState) => prevState - 1);
    };

    function handleDayClick(date: dayjs.Dayjs) {
        handleSetGlobalMonth({ monthIndx: date.month() });
        setEventFormData((prev) => ({ ...prev, eventDay: date }));
    }

    return (
        <SmallCalendar
            monthIndx={smCalMonthIndx}
            handleNextArrow={handleNextMonth}
            handlePrevArrow={handlePrevMonth}
            handleDayClick={handleDayClick}
        />
    );
}
