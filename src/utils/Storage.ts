export default class Storage {
    private static instance: Storage;

    private localStorage: typeof window.localStorage;

    private constructor() {
        this.localStorage = window.localStorage;
    }

    public static get(): Storage {
        if(!Storage.instance) Storage.instance = new Storage();
        return Storage.instance;
    }

    public getItem<T>(key: string, defaultValue?: T): T {
        var item = this.localStorage.getItem(key);
        if(!item) {
            this.setItem(key, defaultValue);
            return defaultValue;
        }
        return JSON.parse(item) as T;
    }

    public setItem<T>(key: string, value: T): void {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    public removeItem(key: string): void {
        this.localStorage.removeItem(key);
    }

    public clear(): void {
        this.localStorage.clear();
    }

    public get length(): number {
        return this.localStorage.length;
    }
}
