import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

interface IMonthIndxContext {
    monthIndx: number;
}
interface SetMonthIndxContext {
    setMonthIndx: React.Dispatch<React.SetStateAction<number>>;
}

const MonthIndxContext = createContext<IMonthIndxContext>(
    {} as IMonthIndxContext,
);
const SetMonthIndxContext = createContext<SetMonthIndxContext>(
    {} as SetMonthIndxContext,
);

export function useMonthIndx() {
    return useContext(MonthIndxContext);
}

export function useSetMonthIndx() {
    return useContext(SetMonthIndxContext);
}

export default function MonthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [monthIndx, setMonthIndx] = useState(dayjs().month());

    return (
        <MonthIndxContext.Provider value={{ monthIndx }}>
            <SetMonthIndxContext.Provider value={{ setMonthIndx }}>
                {children}
            </SetMonthIndxContext.Provider>
        </MonthIndxContext.Provider>
    );
}
