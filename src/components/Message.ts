import { h } from "../runtime/h";
import type { vNode } from "../types/types";
export enum LEVELS {
	INFO = 'info',
	WARNING = 'warning',
	ERROR = 'error'
}
export function MessageComponent(data: { type: LEVELS, message: string }): vNode {
	return h('div', { class: `message message--${data.type}` }, [
		h('p', {}, [data.message])
	])
}
