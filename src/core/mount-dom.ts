import { DOM_TYPES, type vNode, type vText, type vFragment, type vElement, type props } from "../types/types";
import { addEventListeners } from "./events";
import { setAttributes } from "./attributes";
export function mountDOM(node: vNode, parent: HTMLElement , index : number) {
    switch (node.type) {
        case DOM_TYPES.ELEMENT: {
            createElementNode(node as vElement,parent , index);
            break;
        }
        case DOM_TYPES.TEXT: {
            createTextNode(node as vText,parent , index)
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            createFragmentNode(node as vFragment, parent, index);
            break;
        }
        default: {
            throw new Error(`type ${node.type} is not supported`);
        }

    }
}
function createTextNode(node: vText, parent: HTMLElement , index: number) {
    const { value } = node;
    const textNode = document.createTextNode(value);
    node.el = textNode;
    insert(textNode, parent, index);

}
function createFragmentNode(node: vFragment, parent: HTMLElement, index: number) {
    const { children } = node;
    children.map((child) => mountDOM(child, parent,index));
    node.el = parent;
    
}
function createElementNode(node : vElement , parent : HTMLElement , index : number) {
    const { tag, props, children } = node;
    const element = document.createElement(tag);
    addProps(element , props , node);
    node.el = element;

    children.forEach((child) => mountDOM(child, element , index));
    insert(element , parent , index);
}
function addProps(element: HTMLElement, props: props, node: vElement) {
    // destructure events and attributes
    const { on: event, ...attr } = props;
    node.listeners = addEventListeners(element, event!);
    setAttributes(element, attr);

}

export function insert(element: any, parent: HTMLElement, index: number) {

    if (index < 0) {
        throw new Error("Can't insert a node in a negative poisiton");
    }
    if (index == null) {
        parent.append(element);
        return;
    }

    // getting the children
    const children = parent.childNodes;
    if (index >= children.length) {
        parent.append(element)
    } else { 
        parent.insertBefore(parent, children[index]);

    }
   
}
export function areTwoNodesEqual(nodeOne :vNode , nodeTwo : vNode) : boolean {
    if (nodeOne.type != nodeTwo.type) {
        return false;
    }
    if (nodeOne.type = DOM_TYPES.ELEMENT) {
        if ((nodeOne as vElement).tag != (nodeTwo as vElement).tag) {
            return false;
        }
    }
    return true;
}
