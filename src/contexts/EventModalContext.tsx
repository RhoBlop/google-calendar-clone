import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';
import EventModal from '../components/EventModal';

interface IIsModalOpenContext {
    isModalOpen: boolean;
}
interface ISetIsModalOpenContext {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ISelectedDayContext {
    selectedDay: dayjs.Dayjs;
    setSelectedDay: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

// contexts definitions
const IsModalOpenContext = createContext<IIsModalOpenContext>(
    {} as IIsModalOpenContext,
);
const SetIsModalOpenContext = createContext<ISetIsModalOpenContext>(
    {} as ISetIsModalOpenContext,
);
// for some reason i decided not to split this context :/
const SelectedDayContext = createContext<ISelectedDayContext>(
    {} as ISelectedDayContext,
);

// hooks for accessing the context
export function useIsModalOpen() {
    return useContext(IsModalOpenContext);
}
export function useSetIsModalOpen() {
    return useContext(SetIsModalOpenContext);
}
// FIXME - I think this should have it's own context
export function useSelectedDay() {
    return useContext(SelectedDayContext);
}

// Provider that wraps all contexts
export default function EventModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(dayjs);

    return (
        <SelectedDayContext.Provider value={{ selectedDay, setSelectedDay }}>
            <IsModalOpenContext.Provider value={{ isModalOpen }}>
                <SetIsModalOpenContext.Provider value={{ setIsModalOpen }}>
                    {children}
                    <EventModal />
                </SetIsModalOpenContext.Provider>
            </IsModalOpenContext.Provider>
        </SelectedDayContext.Provider>
    );
}
