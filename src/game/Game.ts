import * as PIXI from "pixijs";

import Renderer from "./Renderer";
import Save from "./Save";
import Settings from "./Settings";
import Player from "./entity/player/Player";
import Teo from "./entity/player/Teo";
import Kayce from "./entity/player/Kayce";

import Background from "./components/Background";
import Label from "./components/Label";

import KeyBind from "../utils/KeyBind";
import Storage from "../utils/Storage";
import { gameFont } from "./style";
import { Skin, Towards } from "../types";

export default class Game {
    private renderer: Renderer;
    private save: Save;

    public player: Player;

    public constructor(renderer: Renderer, save: Save) {
        this.renderer = renderer;
        this.save = save;

        this.init();
        this.initListeners();
    }

    private init(): void {
        switch(Settings.get().getValue<Skin>("player.skin")) {
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
        KeyBind.create("a", () => this.player.walk(Towards.LEFT), () => this.player.stopWalking());
        KeyBind.create("d", () => this.player.walk(Towards.RIGHT), () => this.player.stopWalking());
        KeyBind.create(" ", () => this.player.jump());

        window.addEventListener("beforeunload", () => this.saveProgress());
        window.addEventListener("unload", () => this.saveProgress());

        document.addEventListener("visibilitychange", () => this.player.stopWalking());
        window.addEventListener("popstate", () => this.player.stopWalking());
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

    public update(delta: number, frame: PIXI.Container): void {
        // Emit Listeners
        KeyBind.bindList.forEach((handler) => {
            if(handler.pressed) handler.listener();
        });

        frame.removeChildren();

        // dev
        // background
        frame.addChild(Background(0x631e1e));

        // Render Player
        frame.addChild(this.player);
        this.player.update(delta);

        // Player Name
        const playerName = Storage.get().getItem<string>("pw.name");
        var nameText = new Label(playerName, {
            x: 0,
            y: 0,
            style: {
                fill: 0xeeeeee,
                fontSize: 16,
                fontFamily: gameFont
            }
        });
        nameText.textObject.position.x = this.player.x + this.player.width / 2 - nameText.textObject.width / 2;
        nameText.textObject.position.y = this.player.y - 25;
        nameText.appendTo(frame);
    }
}
