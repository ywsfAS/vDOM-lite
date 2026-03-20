import type { vNode } from "../types/types";
export function withoutNulls(arr : (vNode | null | string)[]) : (vNode | string)[]  {
    return arr.filter((x) : x is vNode|string => x != null);
}
