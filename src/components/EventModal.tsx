import { MdAccessTime, MdClose, MdDragHandle, MdNotes } from 'react-icons/md';
import { useEventForm, useEventModal } from '../contexts/EventModalContext';
import dayjs from 'dayjs';
import DatePicker from './DatePicker';

export default function EventModal() {
    const { isModalOpen, setIsModalOpen } = useEventModal();
    const { eventDay, setEventDay } = useEventForm();

    return (
        <div
            className={`${
                isModalOpen
                    ? '-translate-x-1/2 opacity-100'
                    : 'hidden opacity-0'
            } absolute left-1/2 top-1/2 z-40 flex min-w-[456px] -translate-y-1/2 transition-all`}
            key={dayjs().format()}
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
                                placeholder="Adicionar título e horário"
                                className="w-full border-0 border-b-[1.5px] border-gray-400 bg-transparent p-0 text-lg outline-none transition-all focus:border-blue-700 focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Date Selector */}
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
                                className="w-full resize-none overflow-auto overscroll-none p-2 text-sm"
                                onInput={(e) => {
                                    const textarea = e.currentTarget;
                                    textarea.style.height = '';
                                    textarea.style.height = `${
                                        textarea.scrollHeight + 3
                                    }px`;
                                }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* modal footer  */}
                <div className="align-end flex h-12 justify-end">
                    <div className="flex items-center justify-end p-3">
                        <button className="rounded bg-blue-500 px-5 py-[0.35rem] text-sm text-white transition-all hover:bg-blue-600">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
