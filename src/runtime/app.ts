import { destroyDOM } from "../core/destroy-dom";
import { Dispatcher } from "../core/dispatcher";
import { mountDOM } from "../core/mount-dom";
import { type TState , type TView , type vNode } from "../types/types";
export function createApp({ state, view, reducers = {} }: { state: TState, view: TView, reducers : Record<string,Function>}) {
    let parentEl : HTMLElement | null = null;
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
    // passed to components to dispatch commands 
    function emit(commandName : string , payLoad : Record<string,any>) {
        dispatcher.dispatch(commandName,payLoad);
    }
    function renderApp(){
        const newVdom = view(state,emit);
        // vdom = patchDOM(newVdom,vdom,parentEl); //diff algorithm
    }
    return { 
        mount(_parentEl : HTMLElement){
            parentEl = _parentEl;
            vdom = view(state, emit);
            mountDOM(vdom, parentEl);
        },
        unmount() {
            destroyDOM(vdom!);
            vdom = null;
            subscriptions.forEach((unsubHandler) => unsubHandler());
        }
    }

}
    