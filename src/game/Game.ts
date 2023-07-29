import Renderer from "./Renderer";
import Save from "./Save";
import Settings from "./Settings";
import Player from "./entity/player/Player";
import Teo from "./entity/player/Teo";
import Kayce from "./entity/player/Kayce";
import InGameMenu from "./menus/InGameMenu";

import KeyBind from "../utils/KeyBind";
import { EntityAnimation, Skin, Towards } from "../types";

export default class Game {
    private renderer: Renderer;
    private save: Save;

    private player: Player;

    public constructor(renderer: Renderer, save: Save) {
        this.renderer = renderer;
        this.save = save;

        this.init();
        this.initListeners();
    }

    private init(): void {
        switch(Settings.get().getValue<Skin>("skin")) {
            case Skin.TEO:
                this.player = new Teo(this.save.player.x, this.save.player.y, this.save.player.towards);
                break;
            case Skin.KAYCE:
                this.player = new Kayce(this.save.player.x, this.save.player.y, this.save.player.towards);
                break;
        }
    }

    private initListeners(): void {
        // Bind keys
        KeyBind.create("a", () => this.player.walk(Towards.LEFT));
        KeyBind.create("d", () => this.player.walk(Towards.RIGHT));
        KeyBind.create(" ", () => this.player.jump());
        
        document.addEventListener("keyup", () => {
            this.player.stopWalking();
            this.player.playAnimation(EntityAnimation.STANDING);
        });

        window.addEventListener("beforeunload", () => {
            this.saveProgress();
        });
    }

    public saveProgress(): void {
        // Update Save object
        this.save.time = new Date().getTime();
        this.save.player = {
            x: this.player.x,
            y: this.player.y,
            towards: this.player.towards
        };

        this.save.saveToLocal();
    }

    public update(delta: number, menu: InGameMenu): void {
        // Emit Listeners
        KeyBind.bindList.forEach((handler) => {
            if(handler.pressed) handler.listener();
        });

        menu.removeChildren();

        // Render Player
        menu.addChild(this.player);
        this.player.update(delta);
    }
}
