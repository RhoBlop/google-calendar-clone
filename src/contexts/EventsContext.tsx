import { createContext, useContext, useReducer } from 'react';
import '../dayjs.config.ts';

const eventsLocalStorageUrl = 'savedEvents';

interface IEvent {
    id: string;
    date: string;
    title: string;
    description: string;
}

interface savedEvents {
    [key: string]: IEvent[];
}

// EVENT REDUCER
type EventsAction =
    | {
          type: 'CREATE' | 'UPDATE';
          payload: IEvent;
      }
    | { type: 'DELETE'; payload: { id: string } };

function eventsReducer(state: savedEvents, { type, payload }: EventsAction) {
    let newEvents = state;
    switch (type) {
        case 'CREATE':
            newEvents = { ...state };
            if (newEvents[payload.date]) {
                newEvents[payload.date].push(payload);
            } else {
                newEvents[payload.date] = [payload];
            }
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
    savedEvents: savedEvents;
    eventsDispatch: (action: EventsAction) => void;
}

const EventsContext = createContext<IEventsContext | null>(null);

// local storage management
const initialEvents: IEvent[] = JSON.parse(
    localStorage.getItem(eventsLocalStorageUrl) || '{}',
);
function updateLocalStorage(events: savedEvents) {
    localStorage.setItem(eventsLocalStorageUrl, JSON.stringify(events));
}

// Provider that wraps all contexts
export default function EventsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [events, eventsDispatch] = useReducer(eventsReducer, initialEvents);

    return (
        <EventsContext.Provider value={{ savedEvents: events, eventsDispatch }}>
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
