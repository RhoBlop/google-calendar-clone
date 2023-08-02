import { MdClose, MdDragHandle } from 'react-icons/md';
import { useEventForm, useEventModal } from '../contexts/EventModalContext';

export default function EventModal() {
    const { isModalOpen, setIsModalOpen } = useEventModal();
    const {
        formEventInterval: { eventStart, eventEnd },
        setFormEventInterval,
    } = useEventForm();

    return (
        <div
            className={`${
                isModalOpen ? '-translate-x-1/2 opacity-100' : 'opacity-0'
            } absolute left-1/2 top-1/2 z-50 flex h-96 min-w-[456px] -translate-y-1/2 transition-all`}
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
                <div className="flex flex-1 bg-red-50">
                    {eventStart.format('DD/MM/YYYY')}
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
        </div>
    );
}
