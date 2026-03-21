import { withoutNulls } from "../utils/array";
import type { vElement, vFragment, vText, vNode } from "../types/types";
import { DOM_TYPES } from "../types/types";
export function h(tag: string, props: object = {} , children : Array<vNode | null | string> = []) : vElement {
    return {
        tag: tag,
        props: props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
        el: null,
        listeners : null
    }
}

export function hString(value : string) : vText {
    return {
        value: value,
        type: DOM_TYPES.TEXT,
        el : null
    }
}
export function hFragment(children : Array<vNode|null|string>)  : vFragment{
    return {
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.FRAGMENT,
        el : null

    }
}
export function mapTextNodes(arr: Array<vNode| string>):  vNode[] {
    return arr.map((child) => typeof child === 'string' ? hString(child) : child );
}
export function lipsum(count: number, content: string): vFragment {
    return hFragment(
        new Array(count).fill(0).map(() => h('p', {}, [content]))
    );
}


