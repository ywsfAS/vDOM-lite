import type { vNode } from "../types/types";

export enum ARRAY_DIFF_OP{
    ADD,
    REMOVE,
    NOOP,
    MOVE
}

export function withoutNulls(arr : (vNode | null | string)[]) : (vNode | string)[]  {
    return arr.filter((x) : x is vNode|string => x != null);
}

export function arrayDiff(oldArray: string[], newArray: string[]): Record<string, string[]> {
    return {
        added: newArray.filter((key) => !oldArray.includes(key)),
        removed: oldArray.filter((key) => !newArray.includes(key)),
    };
}
class ArrayWithOriginalIndices{

    private array : any[] = [];
    private originalIndices : number[] = [];
    private equalFunc : (a : any , b : any) => boolean ;

    constructor(array: Array<any>, equalfn: () => boolean) {
        this.array = array;
        this.originalIndices = this.array.filter((_, index) => index);
        this.equalFunc = equalfn;

    }
    get length(){
        return this.array.length;
    }
    isRemoval(index : number , newArray : any[] ) : boolean {
        if (index >= this.length) {
            return false;
        }
        const item = this.array[index];
        const indexInNewArray = newArray.findIndex((newItem) => this.equalFunc(item, newItem)
        );
        return indexInNewArray === -1 ;
    }
    removeItem(index : number) : Record<string ,any> {
        const operation = {
            op: ARRAY_DIFF_OP.REMOVE,
            index,
            item: this.array[index]
        }
        // remove from old array and indices
        this.array.splice(index, 1);
        this.originalIndices.splice(index, 1);
        return operation;
    }
    isNoop(index: number, newArray: any[]) : boolean{
        if (index >= this.length) {
            return false;
        }
        const item = this.array[index];
        const newItem = newArray[index];

        return this.equalFunc(item, newItem);
       
    };
    originalIndexAt(index : number) : number{
        return this.originalIndices[index];
    }
    noopItem(index : number)  : Record<string , any>{
        const operation = {
            op: ARRAY_DIFF_OP.NOOP,
            originalIndex : this.originalIndexAt(index),
            index,
            item: this.array[index]
        }
        return operation;
    };
    findIndexFrom(fromIndex: number, item: any): number {

        for (let index = fromIndex ; index < this.length; index++) {
            if (this.equalFunc(item,this.array[index])) {
                return index;
            }       
        }
        return -1;
    }

    isAddition(fromIndex : number , item : any) : boolean {
        return this.findIndexFrom(fromIndex, item) === -1;
    }
    addItem(item: any, index: number): Record<string, any> {
        const operation = {
            op: ARRAY_DIFF_OP.ADD,
            index,
            item
        };
        this.array.splice(index, 0, item);
        this.originalIndices.splice(index, 0, -1) // Added item wasnt originally
        return operation;
    }
    moveItem(item: any, toIndex: number): Record<string, any> {
        const fromIndex = this.findIndexFrom(toIndex, item);
        const operation = {
            op: ARRAY_DIFF_OP.MOVE,
            fromIndex,
            toIndex,
            item : this.array[fromIndex]

        }
        const [_item] = this.array.splice(fromIndex, 1);
        this.array.splice(toIndex, 0, _item);

        const [_originalIndice] = this.array.splice(fromIndex, 1);
        this.array.splice(toIndex , 0 )

        return operation;
    }
    removeItemsAfter(index : number) : Record<string,any>[] {
        const operations = []
        while (this.length > index) {
            operations.push(this.removeItem(index))
        }
        return operations
    }

   
}

export function ArrayDiffSequence(oldArray : any[] , newArray : any[] , equalfunc : () => boolean) {
    const sequence = [];
    const array = new ArrayWithOriginalIndices(oldArray, equalfunc);
    for (let index = 0; index < newArray.length; index++) {
        if (array.isRemoval(index, newArray)) {
            sequence.push(array.removeItem(index));
            index--;
            continue;
        }
        if (array.isNoop(index, newArray)) {
            sequence.push(array.noopItem(index));
            continue;
        }
        const item = newArray[index];
        if (array.isAddition(index, item)) {
            sequence.push(array.addItem(item, index));
            continue;
        }
        sequence.push(array.moveItem(item, index));

    }
    sequence.push(...array.removeItemsAfter(newArray.length));

    return sequence;
}
