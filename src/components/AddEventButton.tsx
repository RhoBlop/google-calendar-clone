import { ReactComponent as GooglePlus } from '../assets/GooglePlus.svg';

interface IAddEventButton {
    isSidebarOpen: boolean;
}

export default function AddEventButton({ isSidebarOpen }: IAddEventButton) {
    return (
        <div
            className={`${
                !isSidebarOpen ? 'translate-x-5' : ''
            } absolute left-2 top-4 z-50 transition-transform duration-300`}
        >
            <button className="google-shadow flex flex-1 items-center justify-center gap-3 rounded-full bg-white p-2 text-sm font-medium text-gray-600">
                <GooglePlus />
                {isSidebarOpen && <span className="mr-4">Criar</span>}
            </button>
        </div>
    );
}
