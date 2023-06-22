import Storage from "../utils/Storage";
import type { RawSave } from "../types";

export default class Save {
    
    private constructor() {

    }

    public static from(raw: RawSave): Save {
        return new Save();
    }

    public static create(): Save {
        var newSave = new Save();
        Storage.get().setItem<RawSave[]>("pw.saves", [...Save.getSaves(), newSave.toRaw()]);
        
        return newSave;
    }

    public static getSaves(): RawSave[] {
        return Storage.get().getItem<RawSave[]>("pw.saves", []);
    }

    public toRaw(): RawSave {
        return {};
    }
}
