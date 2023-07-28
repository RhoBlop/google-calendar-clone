import dayjs from 'dayjs';
import { createContext, useContext, useMemo, useState } from 'react';
import getMonthViewDates from '../utils/getMonthViewDates';

interface IMonthValuesContext {
    monthIndx: number;
    fullMonth: dayjs.Dayjs[];
}
type SetMonthIndxContext = React.Dispatch<React.SetStateAction<number>>;

const MonthValuesContext = createContext<IMonthValuesContext>(
    {} as IMonthValuesContext,
);
const SetMonthIndxContext = createContext<SetMonthIndxContext>(
    {} as SetMonthIndxContext,
);

export function useMonthValues() {
    return useContext(MonthValuesContext);
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
    const fullMonth = useMemo(() => getMonthViewDates(monthIndx), [monthIndx]);

    return (
        <MonthValuesContext.Provider value={{ monthIndx, fullMonth }}>
            <SetMonthIndxContext.Provider value={setMonthIndx}>
                {children}
            </SetMonthIndxContext.Provider>
        </MonthValuesContext.Provider>
    );
}
