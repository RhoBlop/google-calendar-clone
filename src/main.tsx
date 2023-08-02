import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import EventModalProvider from './contexts/EventModalContext.tsx';
import MonthProvider from './contexts/MonthContext.tsx';
import './dayjs.config.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <EventModalProvider>
                <MonthProvider>
                    <App />
                </MonthProvider>
            </EventModalProvider>
        </DndProvider>
    </React.StrictMode>,
);
