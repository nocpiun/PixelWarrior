import { Skin } from "../types";

type SettingsType = Map<string, any>;

export default class Settings {
    private static instance: Settings;
    public static defaultSettings: SettingsType = new Map([
        ["skin", Skin.TEO]
    ]);

    private settings: SettingsType;

    private constructor() {
        this.settings = Settings.defaultSettings;
    }

    public static get(): Settings {
        if(!Settings.instance) Settings.instance = new Settings();
        return Settings.instance;
    }

    public getValue<V>(key: string): V {
        return this.settings.get(key) as V;
    }
}
