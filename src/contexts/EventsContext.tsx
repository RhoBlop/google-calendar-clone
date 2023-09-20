import { createContext, useContext, useReducer } from 'react';
import '../dayjs.config.ts';

const eventsLocalStorageUrl = 'savedEvents';

interface IEvent {
    id: string;
    date: string;
    title: string;
    description: string;
}

// EVENT REDUCER
interface EventsAction {
    type: 'ADD' | 'UPDATE' | 'DELETE';
    payload: IEvent;
}

function eventsReducer(state: IEvent[], { type, payload }: EventsAction) {
    let newEvents = state;
    switch (type) {
        case 'ADD':
            newEvents = [...state, payload];
            updateLocalStorage(newEvents);
            break;

        case 'UPDATE':
            newEvents = state.map((evt) =>
                evt.id === payload.id ? payload : evt,
            );
            updateLocalStorage(newEvents);
            break;

        case 'DELETE':
            newEvents = state.filter((evt) => evt.id !== payload.id);
            updateLocalStorage(newEvents);
            break;

        default:
            console.error('Invalid ACTION_TYPE');
            return state;
    }
    return newEvents;
}

// CONTEXT
interface IEventsContext {
    savedEvents: IEvent[];
    addEvent: (event: IEvent) => void;
    updateEvent: (event: IEvent) => void;
    deleteEvent: (event: IEvent) => void;
}

const EventsContext = createContext<IEventsContext | null>(null);

// local storage management
const initialEvents: IEvent[] = JSON.parse(
    localStorage.getItem(eventsLocalStorageUrl) || '[]',
);
function updateLocalStorage(events: IEvent[]) {
    localStorage.setItem(eventsLocalStorageUrl, JSON.stringify(events));
}

// Provider that wraps all contexts
export default function EventsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [events, eventsDispatch] = useReducer(eventsReducer, initialEvents);

    const addEvent = (event: IEvent) => {
        eventsDispatch({ type: 'ADD', payload: event });
    };

    const updateEvent = (event: IEvent) => {
        eventsDispatch({ type: 'UPDATE', payload: event });
    };

    const deleteEvent = (event: IEvent) => {
        eventsDispatch({ type: 'DELETE', payload: event });
    };

    return (
        <EventsContext.Provider
            value={{ savedEvents: events, addEvent, updateEvent, deleteEvent }}
        >
            {children}
        </EventsContext.Provider>
    );
}

// hook for accessing the context
export function useSavedEvents() {
    const context = useContext(EventsContext);
    if (context === null) {
        throw Error('Context not Provided');
    }

    return context;
}
