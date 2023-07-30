import { ReactComponent as GooglePlus } from '../assets/GooglePlus.svg';
import { useSetIsModalOpen } from '../contexts/EventModalContext';

interface IAddEventButton {
    isSidebarOpen: boolean;
}

export default function AddEventButton({ isSidebarOpen }: IAddEventButton) {
    const { setIsModalOpen } = useSetIsModalOpen();
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
                className="google-create-shadow flex flex-1 items-center justify-center gap-3 rounded-full bg-white p-2 text-sm font-medium text-gray-600"
            >
                <GooglePlus />
                {isSidebarOpen && <span className="mr-4">Criar</span>}
            </button>
        </div>
    );
}
