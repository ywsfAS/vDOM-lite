
export function reactive<T extends object>(object: T, action: () => void) {
    return new Proxy(object, {

        set(target, key, value) {
            target[key as keyof T] = value;
            // side effect --> render app
            action();
            return true;
        }

    })
}
