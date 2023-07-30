import dayjs from 'dayjs';
import { useState } from 'react';
import { MdClose, MdDragHandle } from 'react-icons/md';
import {
    useIsModalOpen,
    useSelectedDay,
    useSetIsModalOpen,
} from '../contexts/EventModalContext';

interface IEventInterval {
    eventStart: dayjs.Dayjs;
    eventEnd: dayjs.Dayjs;
}

export default function EventModal() {
    const { isModalOpen } = useIsModalOpen();
    const { setIsModalOpen } = useSetIsModalOpen();
    const { selectedDay } = useSelectedDay();
    // form values
    const [eventInterval, setEventInterval] = useState<IEventInterval>({
        eventStart: selectedDay,
        eventEnd: selectedDay,
    });

    return (
        isModalOpen && (
            <div className="google-modal-shadow absolute left-1/2 top-1/2 z-50 flex h-96 min-w-[456px] -translate-x-1/2 -translate-y-1/2 flex-col border bg-white">
                {/* modal header */}
                <div className="flex items-center justify-between bg-gray-100 px-3 py-1">
                    <button className="flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-gray-200">
                        <MdDragHandle className="h-full w-full text-gray-400" />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-gray-200"
                    >
                        <MdClose className="h-full w-full font-bold text-gray-600" />
                    </button>
                </div>

                {/* modal body */}
                <div className="flex flex-1 bg-red-50">
                    {eventInterval.eventStart.format('DD/MM/YYYY')}
                </div>

                {/* modal footer  */}
                <div className="align-end flex h-12 justify-end">
                    <div className="flex items-center justify-end p-3">
                        <button className="rounded bg-blue-500 px-5 py-2 text-sm text-white hover:bg-blue-700">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
