import { useEffect, useRef, useState } from 'react';
import { MdAccessTime, MdClose, MdDragHandle, MdNotes } from 'react-icons/md';
import { useEventForm, useEventModal } from '../contexts/EventModalContext';
import DatePicker from './DatePicker';
import { useSavedEvents } from '../contexts/EventsContext';

export default function EventModal() {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const { isModalOpen, setIsModalOpen } = useEventModal();
    const { eventDay, setEventDay } = useEventForm();
    const { addEvent } = useSavedEvents();
    const emailInput = useRef<HTMLInputElement | null>(null);

    const handleCreateEvent = () => {
        addEvent({
            id: eventDay.format(),
            date: eventDay.format('YYYY-MM-DD'),
            title: formData.title,
            description: formData.description,
        });
        setFormData({ title: '', description: '' });
    };

    // bad effect, but easier to do for now (and forever)
    useEffect(() => {
        if (emailInput.current) {
            emailInput.current.focus();
        }
    }, [isModalOpen]);

    return (
        <div
            className={`${
                isModalOpen
                    ? '-translate-x-1/2 opacity-100'
                    : 'hidden opacity-0'
            } absolute left-1/2 top-1/2 z-40 flex min-w-[456px] -translate-y-1/2 transition-all`}
        >
            <div className="google-modal-shadow flex flex-1 flex-col border bg-white">
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
                <div className="flex max-h-80 flex-col gap-4 py-4 pl-2 pr-4 text-gray-700">
                    <div className="flex h-8 items-center gap-2">
                        <div className="w-10"></div>
                        <div className="flex flex-1">
                            <input
                                type="text"
                                className="w-full border-0 border-b-[1px] border-gray-400 bg-transparent p-0 text-lg outline-none transition-all focus:border-blue-700 focus:ring-0"
                                placeholder="Adicionar título e horário"
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        title: e.currentTarget.value,
                                    });
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
                                handleSelectDate={setEventDay}
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <div className="flex w-10 items-start justify-center py-1">
                            <MdNotes className="h-5 w-5 font-bold" />
                        </div>
                        <div className="flex flex-1 items-start">
                            <textarea
                                className="w-full resize-none overflow-auto overscroll-none border-[1px] border-gray-400 p-2 text-sm focus:border-blue-500 focus:ring-0"
                                value={formData.description}
                                onInput={(e) => {
                                    const textarea = e.currentTarget;
                                    textarea.style.height = '';
                                    textarea.style.height = `${
                                        textarea.scrollHeight + 3
                                    }px`;

                                    setFormData({
                                        ...formData,
                                        description: textarea.value,
                                    });
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
                            onClick={handleCreateEvent}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
