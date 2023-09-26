import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useGlobalMonth } from '../contexts/MonthContext';
import getDayClass from '../utils/getDayClass';
import getMonthDates from '../utils/getMonthDates';
import { useSavedEvents, IEvent } from '../contexts/EventsContext';
import { convertDateToSaveFormat } from '../utils/dateConvertions';
import { useEventForm, useEventModal } from '../contexts/EventModalContext';

export default function CalendarView() {
    const {
        globalMonth: { animDirection, globalMonthIndx },
    } = useGlobalMonth();
    const { savedEvents } = useSavedEvents();

    const fullMonth = useMemo(
        () => getMonthDates(globalMonthIndx),
        [globalMonthIndx],
    );

    return (
        <div className="relative flex flex-1">
            <div
                className={`${
                    animDirection ? `${animDirection}-month-anim` : ''
                } absolute inset-0 grid grid-cols-7 grid-rows-5 border-l border-gray-300`}
                key={globalMonthIndx}
            >
                {fullMonth.map((date, indx) => {
                    return (
                        <Day
                            key={indx}
                            date={date}
                            indx={indx}
                            monthIndx={globalMonthIndx}
                            dayEvents={
                                savedEvents[convertDateToSaveFormat(date)]
                            }
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
    dayEvents: IEvent[];
}

function Day({ date, indx, monthIndx, dayEvents }: IDay) {
    const { setModalAction } = useEventModal();
    const { setEventFormData } = useEventForm();

    return (
        <div className={`flex border-b border-r border-gray-300 text-black`}>
            <div className="flex flex-1 flex-col gap-2 text-xs">
                <div className="flex flex-col items-center">
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
                        {date.date() === 1 &&
                            !date.isSame(dayjs(), 'day') &&
                            `${date.format('MMM')}.`}
                    </button>
                </div>
                {dayEvents && (
                    <div className="flex flex-col gap-[2px] px-1">
                        {dayEvents.map((evt, indx) => {
                            return (
                                <div
                                    key={indx}
                                    className="flex flex-1 cursor-pointer rounded-sm bg-amber-400 px-2 py-1 text-left text-white transition-colors hover:bg-amber-300"
                                    onClick={() => {
                                        setEventFormData({
                                            eventId: evt.id,
                                            eventDay: dayjs(evt.date),
                                            title: evt.title,
                                            description: evt.description,
                                        });
                                        setModalAction('EDIT');
                                    }}
                                >
                                    {evt.title}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
