
export class Dispatcher {
    private subs = new Map();
    private afterCommand : Function[] = [];
    subscribe(commandName: string, handler: Function): () => void {
        if (!this.subs.has(commandName)) {
            this.subs.set(commandName, []);
        }
        const handlers : Function[] = this.subs.get(commandName);
        if (handlers.includes(handler)) {
            return () => { };
        }
        handlers.push(handler);

        //return a handler to delete/unsub 
        return () => {
            const id = handlers.indexOf(handler);
            handlers.splice(id, 1);
        }
    }
    afterCommands(handler: Function): () => void{
        this.afterCommand.push(handler);
        return () => {
            const id = this.afterCommand.indexOf(handler);
            this.afterCommand.splice(id, 1);
        }
    }
    dispatch(commandName : string , payLoad : Object) {
        if (this.subs.has(commandName)) {
            const handlers : Function[] = this.subs.get(commandName);
            handlers.forEach((handler) => handler(payLoad));
        } else {
            console.log(`No handlers matching the command name : ${commandName}`);
        }
        this.afterCommand.forEach((afterHandler) => afterHandler());
    }

}