import { destroyDOM } from "../core/destroy-dom";
import { Dispatcher } from "../core/dispatcher";
import { mountDOM } from "../core/mount-dom";
import { type TState , type TView , type vNode } from "../types/types";
export function createApp({ state, view, reducers = {} }: { state: TState, view: TView, reducers : Record<string,Function>}) {
    let parentEl = null;
    let vdom: vNode | null = null;
    const dispatcher = new Dispatcher();
    let subscriptions = [dispatcher.afterCommands(renderApp)];
    for (const actionName in reducers) {
        const reducer = reducers[actionName];
        const unsub = dispatcher.subscribe(actionName, (payload : Object) => {
            reducer(state, payload);
        });
        subscriptions.push(unsub);
    }
    function renderApp(){
        if (vdom) {
            destroyDOM(vdom);
        }
        vdom = view(state);
        mountDOM(vdom, parentEl!);
    }
    return { 
        mount(_parentEl : HTMLElement){
            parentEl = _parentEl;
            renderApp();
        }
    }
}
    