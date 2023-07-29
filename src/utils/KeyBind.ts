type Listener = () => void;

export default class KeyBind {
    public static bindList: KeyBind[] = [];

    private canCallListener: boolean = true;
    public pressed: boolean = false;
    public key: string;
    public listener: Listener;

    private constructor(key: string, listener: Listener) {
        this.key = key;
        this.listener = () => {
            if(!this.canCallListener) return;
            this.canCallListener = false;

            listener();
        };

        document.addEventListener("keypress", (e) => {
            if(this.pressed) return;

            if(e.key.toLowerCase() === key) this.pressed = true;
        });

        document.addEventListener("keyup", () => {
            this.canCallListener = true;
            this.pressed = false;
        });
    }

    public static create(key: string, listener: Listener): KeyBind {
        var instance = new KeyBind(key, listener);
        KeyBind.bindList.push(instance);
        return instance;
    }
}
