import { createContext, useContext, useReducer } from 'react';
import '../dayjs.config.ts';

const eventsLocalStorageUrl = 'savedEvents';

export interface IEvent {
    id: string;
    date: string;
    title: string;
    description: string;
}

// the current data structure works like this:
// each key-value of the object is a date and an array of events, respectively
// must say it's kinda awkward to update this date structure
interface savedEvents {
    [key: string]: IEvent[];
}

// EVENT REDUCER
type EventsAction =
    | {
          type: 'CREATE' | 'UPDATE';
          payload: IEvent;
      }
    | { type: 'DELETE'; payload: { id: string; date: string } };

function eventsReducer(state: savedEvents, { type, payload }: EventsAction) {
    let newEvents = state;
    switch (type) {
        case 'CREATE':
            newEvents = { ...state };
            // check if already exists an event with this id
            if (
                !newEvents[payload.date]?.find((evt) => evt.id === payload.id)
            ) {
                if (newEvents[payload.date]) {
                    newEvents[payload.date].push(payload);
                } else {
                    newEvents[payload.date] = [payload];
                }
            }
            break;

        case 'UPDATE':
            newEvents = { ...state };
            // this is the bit where it became "kinda awkward" to change the data structure
            for (let date of Object.keys(newEvents)) {
                for (let evt of newEvents[date]) {
                    if (evt && evt.id === payload.id) {
                        if (evt.date === payload.date) {
                            // date is the same, so we only map through the date's list
                            // and substitute the older event for the newer one
                            newEvents[payload.date] = newEvents[
                                payload.date
                            ].map((evt) =>
                                evt.id === payload.id ? payload : evt,
                            );
                        } else {
                            // date was edited, so we push the event to it's new date index
                            // and delete where it was before (we move it from one list to the other)
                            if (newEvents[payload.date]) {
                                newEvents[payload.date].push(payload);
                            } else {
                                newEvents[payload.date] = [payload];
                            }

                            newEvents[date] = newEvents[date].filter(
                                (e) => e.id !== evt.id,
                            );
                            if (newEvents[date].length === 0) {
                                delete newEvents[date];
                            }
                        }
                    }
                }
            }
            break;

        case 'DELETE':
            newEvents = { ...state };
            if (newEvents[payload.date]) {
                newEvents[payload.date] = newEvents[payload.date].filter(
                    (evt) => evt.id !== payload.id,
                );
            }
            break;

        default:
            console.error('Invalid ACTION_TYPE');
            return state;
    }
    updateLocalStorage(newEvents);
    return newEvents;
}

// CONTEXT
interface IEventsContext {
    savedEvents: savedEvents;
    eventsDispatch: (action: EventsAction) => void;
}

const EventsContext = createContext<IEventsContext | null>(null);

// local storage management
const initialEvents: savedEvents = JSON.parse(
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
