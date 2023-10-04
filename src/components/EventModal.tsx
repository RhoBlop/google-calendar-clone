import { useEffect, useRef } from 'react';
import {
    MdAccessTime,
    MdClose,
    MdDelete,
    MdDragHandle,
    MdNotes,
} from 'react-icons/md';
import { useEventForm, useEventModal } from '../contexts/EventModalContext';
import DatePicker from './DatePicker';
import { useSavedEvents } from '../contexts/EventsContext';
import dayjs from 'dayjs';
import { dateAsId, convertDateToSaveFormat } from '../utils/dateConvertions';

// kinda messy 'cause works for both create, update and deleting
export default function EventModal() {
    const {
        eventFormData: { eventId, eventDay, title, description },
        setEventFormData,
    } = useEventForm();
    const { modalAction, setModalAction } = useEventModal();
    const { eventsDispatch } = useSavedEvents();
    const emailInput = useRef<HTMLInputElement | null>(null);

    const handleCreateEvent = () => {
        eventsDispatch({
            type: 'CREATE',
            payload: {
                id: dateAsId(),
                date: convertDateToSaveFormat(eventDay),
                title,
                description,
            },
        });
        setEventFormData({
            eventId: null,
            eventDay: dayjs(),
            title: '',
            description: '',
        });
        setModalAction(null);
    };

    const handleUpdateEvent = () => {
        if (eventId) {
            eventsDispatch({
                type: 'UPDATE',
                payload: {
                    id: eventId,
                    date: convertDateToSaveFormat(eventDay),
                    title,
                    description,
                },
            });
            setModalAction(null);
        }
    };

    const handleDeleteEvent = () => {
        if (eventId) {
            eventsDispatch({
                type: 'DELETE',
                payload: {
                    id: eventId,
                    date: convertDateToSaveFormat(eventDay),
                },
            });
            setModalAction(null);
        }
    };

    // bad effect, but easier to do for now (and forever)
    useEffect(() => {
        if (modalAction && emailInput.current) {
            emailInput.current.focus();
        }
    }, [modalAction]);

    return (
        modalAction && (
            <div className="absolute left-1/2 top-1/2 z-40 flex min-w-[456px] -translate-x-1/2 -translate-y-1/2 opacity-100 transition-all">
                <div className="google-modal-shadow flex flex-1 flex-col border bg-white">
                    {/* modal header */}
                    <div className="flex items-center justify-between bg-gray-100 px-3 py-1">
                        {modalAction === 'EDIT' ? (
                            <button
                                onClick={handleDeleteEvent}
                                className="flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-gray-200"
                            >
                                <MdDelete className="h-full w-full font-bold text-red-600" />
                            </button>
                        ) : (
                            <button className="flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-gray-200">
                                <MdDragHandle className="h-full w-full font-bold text-gray-600" />
                            </button>
                        )}
                        <button
                            onClick={() => setModalAction(null)}
                            className="flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-gray-200"
                        >
                            <MdClose className="h-full w-full font-bold text-gray-600" />
                        </button>
                    </div>

                    {/* modal body */}
                    <div className="flex max-h-80 flex-col gap-4 py-4 pl-2 pr-4 text-gray-700">
                        <div className="flex h-8 items-center gap-2">
                            <div className="w-10"></div>
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    className="w-full border-0 border-b-[1px] border-gray-400 bg-transparent p-0 text-lg outline-none transition-all focus:border-blue-700 focus:ring-0"
                                    placeholder="Adicionar título e horário"
                                    value={title}
                                    onChange={(e) => {
                                        const text = e.currentTarget.value;

                                        setEventFormData((prev) => ({
                                            ...prev,
                                            title: text,
                                        }));
                                    }}
                                    ref={emailInput}
                                />
                            </div>
                        </div>

                        {/* date selector */}
                        <div className="flex h-8 items-center gap-2">
                            <div className="flex w-10 items-center justify-center py-2">
                                <MdAccessTime className="h-5 w-5 font-bold" />
                            </div>
                            <div className="flex flex-1 items-center">
                                <DatePicker
                                    date={eventDay}
                                    handleSelectDate={(date) =>
                                        setEventFormData((prev) => ({
                                            ...prev,
                                            eventDay: date,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="flex w-10 items-start justify-center py-1">
                                <MdNotes className="h-5 w-5 font-bold" />
                            </div>
                            <div className="flex flex-1 items-start">
                                <textarea
                                    className="max-h-44 min-h-[72px] w-full resize-none overflow-hidden border-[1px] border-gray-400 p-2 text-sm focus:border-blue-500 focus:ring-0"
                                    value={description}
                                    onInput={(e) => {
                                        const textarea = e.currentTarget;
                                        textarea.style.height = '0';
                                        textarea.style.height =
                                            textarea.scrollHeight + 'px';

                                        setEventFormData((prev) => ({
                                            ...prev,
                                            description: textarea.value,
                                        }));
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* modal footer  */}
                    <div className="align-end flex h-12 justify-end">
                        <div className="flex items-center justify-end p-3">
                            <button
                                className="rounded bg-blue-500 px-5 py-[0.35rem] text-sm text-white transition-all hover:bg-blue-600"
                                onClick={() => {
                                    if (title) {
                                        switch (modalAction) {
                                            case 'CREATE':
                                                handleCreateEvent();
                                                break;

                                            case 'EDIT':
                                                handleUpdateEvent();
                                                break;

                                            default:
                                                console.error(
                                                    'Invalid MODAL_ACTION',
                                                );
                                        }
                                    }
                                }}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
