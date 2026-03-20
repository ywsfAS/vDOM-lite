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
}
export interface vFragment {
    children: vNode[],
    type: DOM_TYPES
}
export interface vText {
    value: string,
    type: DOM_TYPES
}
export type vNode = vElement | vFragment | vText;