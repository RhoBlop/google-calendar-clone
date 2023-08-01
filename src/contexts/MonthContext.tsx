import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

// Big Calendar - "global" - context
interface IGlobalMonthState {
    globalMonthIndx: number;
    animDirection: 'next' | 'prev' | null;
}
interface IGlobalMonthContext {
    globalMonth: IGlobalMonthState;
    setGlobalMonth: React.Dispatch<React.SetStateAction<IGlobalMonthState>>;
}
const GlobalMonthContext = createContext<IGlobalMonthContext | null>(null);

export function useGlobalMonth() {
    const context = useContext(GlobalMonthContext);
    if (context === null) {
        throw Error('Context not Provided');
    }

    return context;
}

// Sidebar calendar - the small one - context
interface ISmallCalendarMonthContext {
    smCalMonthIndx: number;
    setSmCalMonthIndx: React.Dispatch<React.SetStateAction<number>>;
}
const SmCalMonthContext = createContext<ISmallCalendarMonthContext | null>(
    null,
);

export function useSmCalMonth() {
    const context = useContext(SmCalMonthContext);
    if (context === null) {
        throw Error('Context not Provided');
    }

    return context;
}

// provider for both contexts
const todaysMonthIndx = dayjs().month();

export default function MonthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [globalMonth, setGlobalMonth] = useState<IGlobalMonthState>({
        globalMonthIndx: todaysMonthIndx,
        animDirection: null,
    });
    const [smCalMonthIndx, setSmCalMonthIndx] = useState(todaysMonthIndx);

    return (
        <GlobalMonthContext.Provider value={{ globalMonth, setGlobalMonth }}>
            <SmCalMonthContext.Provider
                value={{ smCalMonthIndx, setSmCalMonthIndx }}
            >
                {children}
            </SmCalMonthContext.Provider>
        </GlobalMonthContext.Provider>
    );
}
