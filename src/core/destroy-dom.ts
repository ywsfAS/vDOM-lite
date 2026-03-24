import { type vNode , DOM_TYPES, type vText ,type vFragment, type vElement } from "../types/types";
import { removeEventListeners } from "./events";
export function destroyDOM(node : vNode) {
    const { type } = node;
    switch (type) {
        case DOM_TYPES.ELEMENT: {
            destroyElementNode(node as vElement);
            break;
        }
        case DOM_TYPES.TEXT: {
            destroyTextNode(node as vText);
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            destroyFragmentNode(node as vFragment);
            break;
        }
        default: {
            throw new Error(`Cant'destroy Node of type ${type}`);
        }
    }
}
export function destroyTextNode(node: vText) {
    const { el } = node;
    el?.remove();
}
export function destroyFragmentNode(node : vFragment) {
    const {children } = node;
    children.forEach(destroyDOM);
}
export function destroyElementNode(node : vElement) {
    const { el, children, listeners } = node;
    children.forEach(destroyDOM);
    if (listeners) {
        removeEventListeners(el!,listeners);
    }
}
