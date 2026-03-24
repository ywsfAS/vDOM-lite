
export function addEventListener(eventName: string, handler: EventListener, element: HTMLElement): EventListener
{
    function boundHandler(event : Event) {
        
        handler(event);
    }
    element.addEventListener(eventName, boundHandler);
    return boundHandler;
}

export function addEventListeners(element: HTMLElement, events: Record<string, EventListener> = {}) : Record<string,EventListener> {
    let listeners: Record<string, EventListener> = {};

    Object.entries(events).forEach(([key, handler]) => {
        // add events handlers
        const listener = addEventListener(key, handler, element);
        listeners[key] = listener;
    })
    return listeners;
}
export function removeEventListeners(element: HTMLElement, listeners: Record<string, EventListener> = {}) {
    Object.entries(listeners).forEach( ([name,handler]) => {
        element.removeEventListener(name, handler);
    })
}
