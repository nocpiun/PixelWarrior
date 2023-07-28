import Storage from "../utils/Storage";
import type { RawSave } from "../types";

export default class Save {
    private id: number;
    private time: number;
    
    private constructor(id: number, time: number) {
        this.id = id;
        this.time = time;
    }

    public static from(raw: RawSave): Save {
        return new Save(raw.id, raw.time);
    }

    public static create(): Save {
        var newSave = new Save(Save.getSaves().length + 1, new Date().getTime());
        Storage.get().setItem<RawSave[]>("pw.saves", [...Save.getSaves(), newSave.toRaw()]);
        
        return newSave;
    }

    public static getSaves(): RawSave[] {
        return Storage.get().getItem<RawSave[]>("pw.saves", []);
    }

    public toRaw(): RawSave {
        return {
            id: this.id,
            time: this.time
        };
    }
}
