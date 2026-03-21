import { DOM_TYPES, type vNode, type vText, type vFragment, type vElement, type props } from "../types/types";
import { addEventListeners } from "./events";
import { setAttributes } from "./attributes";
export function mountDOM(node: vNode, parent: HTMLElement) {
    switch (node.type) {
        case DOM_TYPES.ELEMENT: {
            createElementNode(node as vElement,parent);
            break;
        }
        case DOM_TYPES.TEXT: {
            createTextNode(node as vText,parent)
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            createFragmentNode(node as vFragment,parent)
            break;
        }
        default: {
            throw new Error(`type ${node.type} is not supported`);
        }

    }
}
function createTextNode(node: vText, parent: HTMLElement) {
    const { value } = node;
    const textNode = document.createTextNode(value);
    node.el = textNode;
    parent.append(textNode);

}
function createFragmentNode(node : vFragment , parent : HTMLElement) {
    const { children } = node;
    children.map((child) => mountDOM(child, parent));
    node.el = parent;
    
}
function createElementNode(node : vElement , parent : HTMLElement) {
    const { tag, props, children } = node;
    const element = document.createElement(tag);
    addProps(element , props , node);
    node.el = element;

    children.forEach((child) => mountDOM(child, element));
    parent.appendChild(element);
}
function addProps(element: HTMLElement, props: props, node: vElement) {
    // destructure events and attributes
    const { on: event, ...attr } = props;
    node.listeners = addEventListeners(element, event!);
    setAttributes(element, attr);
}
