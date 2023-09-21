import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';
import EventModal from '../components/EventModal';
import '../dayjs.config.ts';

type ModalAction = 'CREATE' | 'EDIT' | null;

interface IEventModalContext {
    modalAction: ModalAction;
    setModalAction: React.Dispatch<React.SetStateAction<ModalAction>>;
}

interface IEventFormData {
    eventId: string | null;
    eventDay: dayjs.Dayjs;
    title: string;
    description: string;
}

interface IEventFormContext {
    eventFormData: IEventFormData;
    setEventFormData: React.Dispatch<React.SetStateAction<IEventFormData>>;
}

// contexts definitions
const EventModalContext = createContext<IEventModalContext | null>(null);
// for some reason i decided not to split this context :/
const EventFormContext = createContext<IEventFormContext | null>(null);

// hooks for accessing the context
export function useEventModal() {
    const context = useContext(EventModalContext);
    if (context === null) {
        throw Error('Context not Provided');
    }

    return context;
}
export function useEventForm() {
    const context = useContext(EventFormContext);
    if (context === null) {
        throw Error('Context not Provided');
    }

    return context;
}

const today = dayjs();

// Provider that wraps all contexts
export default function EventModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [modalAction, setModalAction] = useState<ModalAction>(null);
    const [eventFormData, setEventFormData] = useState<IEventFormData>({
        eventId: null,
        eventDay: today,
        title: '',
        description: '',
    });

    return (
        <EventFormContext.Provider value={{ eventFormData, setEventFormData }}>
            <EventModalContext.Provider value={{ modalAction, setModalAction }}>
                {children}
                <EventModal />
            </EventModalContext.Provider>
        </EventFormContext.Provider>
    );
}
