import { DOM_TYPES, type vElement, type vNode, type vText } from "../types/types";
import { objectDiff } from "../utils/object";
import { arrayDiff } from "../utils/array";
import { isNotBlankOrEmptyString } from "../utils/string"
import { areTwoNodesEqual, mountDOM } from "../core/mount-dom";
import { destroyDOM } from "./destroy-dom";
import { removeAttribute, setAttribute, removeStyle, setStyle } from "./attributes";
import { addEventListener } from "./events";
export function patchDOM(oldVNode : vNode , newVNode : vNode , parentEl : HTMLElement) {

    if (!areTwoNodesEqual(oldVNode, newVNode)) {
        // get element origin index in dom
        const element = oldVNode.el as HTMLElement;
        const index = getIndexOfElementFromParent(element, parentEl);
        destroyDOM(oldVNode);
        mountDOM(newVNode, parentEl, index as number);
    }
    // pass the el reference to the new vdom
    newVNode.el = oldVNode.el;
    switch (newVNode.type) {
        case DOM_TYPES.TEXT: {
            patchText(oldVNode as vText, newVNode as vText);
            return newVNode;
        };
        case DOM_TYPES.ELEMENT: {
            patchElement(oldVNode as vElement , newVNode as vElement);
            break;
        }
    }
    return newVNode;
}

export function patchElement(oldVNode: vElement, newVNode: vElement) {
    // extract new and old properties for a patch
    const {
        class: oldClass,
        style: oldStyle,
        on: oldEvent,
        ...Oldattributes
    } = oldVNode.props;
    const { listeners : oldListeners } = oldVNode;
    const {
        class: newClass,
        style: newStyle,
        on: newEvent,
        ...newattributes
    } = newVNode.props;
    const el = oldVNode.el!;
    patchAttr(el, Oldattributes, newattributes);
    patchClasses(el, oldClass, newClass);
    patchStyles(el ,oldStyle, newStyle);

    newVNode.listeners = patchEvents(el , oldEvent , oldListeners! , newEvent);
}

export function patchAttr(element: HTMLElement, oldAttributes: Record<string, any>, newAttributes: Record<string, any>) {
    const { addedKeys, removedKeys, updatedKeys } = objectDiff(oldAttributes, newAttributes);
    for (const attr of removedKeys) {
        removeAttribute(element, attr);
    }

    const addedAttributes = addedKeys.concat(updatedKeys);
    for (const attr of addedAttributes) {
        setAttribute(element, attr, newAttributes[attr]);
    }
}

export function patchText(oldVNode : vText , newVNode : vText ) {
    const el  = oldVNode.el;
    const { value: oldTextValue } = oldVNode;
    const { value: newTextValue } = newVNode;

    if (oldTextValue !== newTextValue) {
        el!.nodeValue = newTextValue;
    }

}

export function getIndexOfElementFromParent(element: HTMLElement, parent: HTMLElement): number | null {
    const index = Array.from(parent.childNodes).indexOf(element);
    if (index === -1) {
        return null;
    }
    return index;
}
export function patchClasses(el : HTMLElement , oldClass : string,newClass : string) {
    const oldClasses = toClassList(oldClass);
    const newClasses = toClassList(newClass);

    const { added, removed } = arrayDiff(oldClasses, newClasses);
    if (removed.length > 0) {
        el.classList.remove(...removed);
    }
    if (added.length > 0) {
        el.classList.add(...added);
    }
}
function toClassList(classes = '') : string[] {
    return Array.isArray(classes)
        ? classes.filter(isNotBlankOrEmptyString)
        : classes.split(/(\s+)/)
            .filter(isNotBlankOrEmptyString)
}
function patchStyles(element: HTMLElement, oldStyle: Record<string, string> = {}, newStyle: Record<string, string> = {}) {
    const { addedKeys, removedKeys, updatedKeys } = objectDiff(oldStyle, newStyle);

    for (const style of removedKeys) {
        removeStyle(element, style);
    }
    const addedStyles = addedKeys.concat(updatedKeys);
    for (const style of addedStyles) {
        setStyle(element,style,newStyle[style]);
    }
}

function patchEvents(element: HTMLElement, oldListeners: Record<string, any> = {}, oldEvents: Record<string, any> = {}, newEvents: Record<string, any> = {}) {
    const { addedKeys, removedKeys, updatedKeys } = objectDiff(oldEvents, newEvents);

    for (const eventName of removedKeys.concat(updatedKeys)) {
        element.removeEventListener(eventName, oldListeners[eventName])
    }
    const addedListeners: Record<string, any> = {}                      
    for (const eventName of addedKeys.concat(updatedKeys)) {
        const listener =
        addEventListener(eventName, newEvents[eventName], element);
        addedListeners[eventName] = listener
    }
    return addedListeners
}
