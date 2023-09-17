import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

// Big Calendar - "global" - context
interface IGlobalMonthState {
    globalMonthIndx: number;
    animDirection: 'next' | 'prev' | null;
}
type IHandleSetGlobalMonth = {
    monthIndx?: number;
    incrementVal?: number;
};
interface IGlobalMonthContext {
    globalMonth: IGlobalMonthState;
    handleSetGlobalMonth: (obj: IHandleSetGlobalMonth) => void;
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

    // you can both set to a specific monthIndx or increment some value
    function handleSetGlobalMonth({
        monthIndx,
        incrementVal,
    }: IHandleSetGlobalMonth) {
        console.log(monthIndx, incrementVal);
        const { globalMonthIndx, animDirection } = globalMonth;
        let newMonthIndx: number | null = null;
        let newAnimDirection: typeof animDirection = null;

        if (monthIndx) {
            newMonthIndx = monthIndx;
        } else if (incrementVal) {
            newMonthIndx = globalMonthIndx + incrementVal;
        }

        if (!newMonthIndx) {
            return;
        }
        if (newMonthIndx > globalMonthIndx) {
            newAnimDirection = 'next';
        } else if (newMonthIndx < globalMonthIndx) {
            newAnimDirection = 'prev';
        }

        setGlobalMonth((prevState) => {
            if (!newMonthIndx) {
                return prevState;
            }

            return {
                ...prevState,
                globalMonthIndx: newMonthIndx,
                animDirection: newAnimDirection,
            };
        });
        setSmCalMonthIndx(newMonthIndx);
    }

    return (
        <GlobalMonthContext.Provider
            value={{ globalMonth, handleSetGlobalMonth }}
        >
            <SmCalMonthContext.Provider
                value={{ smCalMonthIndx, setSmCalMonthIndx }}
            >
                {children}
            </SmCalMonthContext.Provider>
        </GlobalMonthContext.Provider>
    );
}
