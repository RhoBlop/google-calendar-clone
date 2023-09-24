import dayjs from 'dayjs';
import { ReactComponent as GooglePlus } from '../assets/GooglePlus.svg';
import { useEventForm, useEventModal } from '../contexts/EventModalContext';

interface IAddEventButton {
    isSidebarOpen: boolean;
}

export default function AddEventButton({ isSidebarOpen }: IAddEventButton) {
    const { setModalAction } = useEventModal();
    const { setEventFormData } = useEventForm();
    return (
        <div
            className={`${
                !isSidebarOpen ? 'translate-x-5' : ''
            } absolute left-2 top-4 z-50 transition-transform duration-300`}
        >
            <button
                onClick={() => {
                    setModalAction('CREATE');
                    setEventFormData({
                        eventId: null,
                        eventDay: dayjs(),
                        title: '',
                        description: '',
                    });
                }}
                className="google-create rounded-full bg-white px-2 py-1 text-sm font-medium text-gray-600 transition-all"
            >
                <div className="flex flex-1 items-center justify-center gap-3">
                    <GooglePlus />
                    {isSidebarOpen && <span className="mr-4">Criar</span>}
                </div>
            </button>
        </div>
    );
}
