
export function addEventListener(eventName: string, handler: EventListener, element: HTMLElement): EventListener
{
    element.addEventListener(eventName, handler);
    return handler
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
