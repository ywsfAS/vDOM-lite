// virtual DOM types
export enum DOM_TYPES {
    TEXT,
    FRAGMENT,
    ELEMENT,

}
export interface vElement {
    tag: string,
    props: Object,
    children: vNode[],
    type: DOM_TYPES,
    el: HTMLElement | null,
    listeners : Record<string,EventListener> | null
}
export interface vFragment {
    children: vNode[],
    type: DOM_TYPES,
    el : HTMLElement | null
}
export interface vText {
    value: string,
    type: DOM_TYPES,
    el: Text | null
}
export type props = {
    on?: Record<string, EventListener>;
    [key: string] : any;
}

export type vNode = vElement | vFragment | vText;
export type TState = Record<string, any>;
export type TView = (s: TState , e? : Function) => vNode;