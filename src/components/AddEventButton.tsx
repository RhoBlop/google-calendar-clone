import { ReactComponent as GooglePlus } from '../assets/GooglePlus.svg';
import { useEventModal } from '../contexts/EventModalContext';

interface IAddEventButton {
    isSidebarOpen: boolean;
}

export default function AddEventButton({ isSidebarOpen }: IAddEventButton) {
    const { setIsModalOpen } = useEventModal();
    return (
        <div
            className={`${
                !isSidebarOpen ? 'translate-x-5' : ''
            } absolute left-2 top-4 z-50 transition-transform duration-300`}
        >
            <button
                onClick={() => {
                    setIsModalOpen(true);
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
