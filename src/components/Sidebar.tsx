import SmallCalendar from './SmallCalendar';

interface ISidebar {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: ISidebar) {
    return (
        <div
            className={`${
                isOpen ? 'ml-0' : '-ml-64 mr-2'
            } w-64 overflow-hidden transition-all duration-300 ease-in`}
        >
            <div className="mt-16 flex flex-col items-center p-6">
                <SmallCalendar />
                {/* <LabelsSection /> */}
            </div>
        </div>
    );
}
