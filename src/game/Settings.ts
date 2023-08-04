import { Skin } from "../types";
import Storage from "../utils/Storage";
import Utils from "../utils/Utils";

type SettingsType = Map<string, any>;

const storageKey: string = "pw.settings";

export default class Settings {
    private static instance: Settings;
    public static defaultSettings: SettingsType = new Map([
        ["player.skin", Skin.TEO]
    ]);

    private settings: SettingsType;

    private constructor() {
        this.settings = new Map(Storage.get().getItem(storageKey, Utils.mapToArray(Settings.defaultSettings)));
    }

    public static get(): Settings {
        if(!Settings.instance) Settings.instance = new Settings();
        return Settings.instance;
    }

    public getValue<V>(key: string): V {
        return this.settings.get(key) as V;
    }

    public setValue<V>(key: string, value: V): void {
        this.settings.set(key, value);
        Storage.get().setItem(storageKey, Utils.mapToArray(this.settings));
    }
}
