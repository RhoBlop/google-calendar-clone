import { MdClose, MdDragHandle } from 'react-icons/md';
import {
    useIsModalOpen,
    useSetIsModalOpen,
} from '../contexts/EventModalContext';

export default function EventModal() {
    const { isModalOpen } = useIsModalOpen();
    const { setIsModalOpen } = useSetIsModalOpen();

    return (
        isModalOpen && (
            <div className="absolute left-1/2 top-1/2 z-50 h-96 min-w-[512px] -translate-x-1/2 -translate-y-1/2 border bg-white">
                <header className="flex items-center justify-between bg-gray-100 px-3 py-1">
                    <button className="flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-gray-200">
                        <MdDragHandle className="h-full w-full text-gray-400" />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-gray-200"
                    >
                        <MdClose className="h-full w-full font-bold text-gray-600" />
                    </button>
                </header>
            </div>
        )
    );
}
