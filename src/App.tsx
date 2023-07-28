import { useState } from 'react';
import AddEventButton from './components/AddEventButton';
import Month from './components/CalendarView';
import PageHeader from './components/PageHeader';
import Sidebar from './components/Sidebar';
import MonthProvider from './contexts/MonthContext';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen flex-col">
            <MonthProvider>
                <PageHeader
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                <div className="relative flex flex-1 overflow-hidden">
                    <AddEventButton isSidebarOpen={sidebarOpen} />
                    <Sidebar isOpen={sidebarOpen} />
                    <Month />
                </div>
            </MonthProvider>
        </div>
    );
}

export default App;
