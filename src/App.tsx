import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import AddEventButton from './components/AddEventButton';
import CalendarView from './components/CalendarView';
import PageHeader from './components/PageHeader';
import Sidebar from './components/Sidebar';
import { useEventModal } from './contexts/EventModalContext';

const today = dayjs().date();

const googleFaviconUrl = `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${today}.ico`;
export const googleLogoUrl = `https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${today}_2x.png`;

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { isModalOpen, setIsModalOpen } = useEventModal();

    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'icon');
            document.querySelector('head')?.appendChild(link);
        }
        link.setAttribute('href', googleFaviconUrl);
    }, []);

    return (
        <div
            className="relative flex h-screen flex-col"
            onClick={() => isModalOpen && setIsModalOpen(false)}
        >
            <PageHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="relative flex flex-1 overflow-hidden">
                <AddEventButton isSidebarOpen={sidebarOpen} />
                <Sidebar isOpen={sidebarOpen} />
                <CalendarView />
            </div>
        </div>
    );
}

export default App;
