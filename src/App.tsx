import { useState } from 'react';
import AddEventButton from './components/AddEventButton';
import CalendarView from './components/CalendarView';
import PageHeader from './components/PageHeader';
import Sidebar from './components/Sidebar';
import EventModalProvider from './contexts/EventModalContext';
import MonthProvider from './contexts/MonthContext';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="relative flex h-screen flex-col">
            <EventModalProvider>
                <MonthProvider>
                    <PageHeader
                        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />

                    <div className="relative flex flex-1 overflow-hidden">
                        <AddEventButton isSidebarOpen={sidebarOpen} />
                        <Sidebar isOpen={sidebarOpen} />
                        <CalendarView />
                    </div>
                </MonthProvider>
            </EventModalProvider>
        </div>
    );
}

export default App;
