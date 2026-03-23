
export function objectDiff(oldObject: Record<string, any>, newObject: Record<string, any>) {
    const oldKeys = Object.keys(oldObject);
    const newKeys = Object.keys(newObject);

    return {
        addedKeys: newKeys.filter((key) => !oldKeys.includes(key)),
        removedKeys: oldKeys.filter((key) => !newKeys.includes(key)),
        updatedKeys: newKeys.filter((key) => oldKeys.includes(key) && newObject[key] !== oldObject[key])
    };
}