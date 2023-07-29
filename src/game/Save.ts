import Storage from "../utils/Storage";
import { Towards, RawSave, PlayerSave } from "../types";

export default class Save {
    public id: number;
    public time: number;
    public player: PlayerSave | null = null;
    
    public constructor(raw: RawSave) {
        this.id = raw.id;
        this.time = raw.time;

        this.player = raw.player ?? {
            x: 10,
            y: 30,
            towards: Towards.RIGHT
        };
    }

    public static create(): Save {
        var newSave = new Save({
            id: Save.getSaves().length + 1,
            time: new Date().getTime(),
            player: null
        });
        Storage.get().setItem<RawSave[]>("pw.saves", [...Save.getSaves(), newSave.toRaw()]);
        
        return newSave;
    }

    public static getSaves(): RawSave[] {
        return Storage.get().getItem<RawSave[]>("pw.saves", []);
    }

    public saveToLocal(): void {
        var saves = Save.getSaves();

        for(let i = 0; i < saves.length; i++) {
            if(saves[i].id === this.id) {
                saves[i] = this.toRaw();
                break;
            }
        }

        Storage.get().setItem<RawSave[]>("pw.saves", saves);
    }

    public toRaw(): RawSave {
        return {
            id: this.id,
            time: this.time,
            player: this.player
        };
    }
}
