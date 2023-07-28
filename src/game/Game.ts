import * as PIXI from "pixijs";

import Renderer from "./Renderer";
import Save from "./Save";
import Settings from "./Settings";
import Player from "./entity/player/Player";
import Teo from "./entity/player/Teo";
import Kayce from "./entity/player/Kayce";

import { EntityAnimation, Skin, Towards } from "../types";
import InGameMenu from "./menus/InGameMenu";

export default class Game {
    private renderer: Renderer;
    private save: Save;

    private player: Player;
    
    /**
     * We need a variable following to prevent the `keydown` listener
     * being called multiple times.
     * Otherwise, the player will not stop walking after `keyup` since
     * the walking timer is created repeatedly.
     */
    private callKeyPress: boolean = true;

    public constructor(renderer: Renderer, save: Save) {
        this.renderer = renderer;
        this.save = save;

        this.init();
        this.initListeners();
    }

    private init(): void {
        switch(Settings.get().getValue<Skin>("skin")) {
            case Skin.TEO:
                this.player = new Teo(10, 30, Towards.RIGHT);
                break;
            case Skin.KAYCE:
                this.player = new Kayce(10, 30, Towards.RIGHT);
                break;
        }
    }

    private initListeners(): void {
        document.addEventListener("keypress", (e) => {
            if(!this.callKeyPress) return;
            this.callKeyPress = false;
            switch(e.key) {
                case "d":
                    this.player.walk(Towards.RIGHT);
                    break;
            }
        });
        
        document.addEventListener("keyup", () => {
            this.callKeyPress = true;
            this.player.stopWalking();
            this.player.playAnimation(EntityAnimation.STANDING_RIGHT);
        });
    }

    public update(delta: number, menu: InGameMenu): void {
        menu.removeChildren();

        // Render player
        var playerTexture = this.player.skinTexture;
        var playerSprite = new PIXI.Sprite(playerTexture);
        playerSprite.position.set(this.player.x, this.player.y);
        playerSprite.width = 50;
        playerSprite.height = 110;
        menu.addChild(playerSprite);
    }
}
