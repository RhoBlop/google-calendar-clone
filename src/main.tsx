import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import EventModalProvider from './contexts/EventModalContext.tsx';
import MonthProvider from './contexts/MonthContext.tsx';
import './dayjs.config.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <EventModalProvider>
            <MonthProvider>
                <App />
            </MonthProvider>
        </EventModalProvider>
    </React.StrictMode>,
);
