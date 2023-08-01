import * as PIXI from "pixijs";

import Menu from "./Menu";
import Game from "../Game";
import Renderer from "../Renderer";
import Label from "../components/Label";

import { MenuType } from "../../types";
import { gameFont } from "../style";

export default class InGameMenu extends Menu {
    private renderer: Renderer;
    private game: Game;
    private gameFrame: PIXI.Container;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.initListeners();
    }

    public init(game: Game): void {
        this.game = game;

        // Game Frame
        this.gameFrame = new PIXI.Container();
        this.addChild(this.gameFrame);

        var player = this.game.player;

        // HP Bar
        const hpbarWidth = 450;
        const hpbarHeight = 25;
        const hpbarMargin = 30;
        const hpbarPadding = 5;
        var hpbarBorder = new PIXI.Graphics();
        hpbarBorder.lineStyle(5, 0xffffff);
        hpbarBorder.drawRect(
            window.innerWidth - hpbarWidth - hpbarMargin,
            hpbarMargin,
            hpbarWidth,
            hpbarHeight
        );
        this.addChild(hpbarBorder);

        var hpbar = new PIXI.Graphics();
        hpbar.beginFill(0xf01f1f);
        hpbar.drawRect(
            window.innerWidth - hpbarWidth - hpbarMargin + hpbarPadding,
            hpbarMargin + hpbarPadding,
            (hpbarWidth - 2 * hpbarPadding) * (player.health / player.maxHealth),
            hpbarHeight - 2 * hpbarPadding
        );
        this.addChild(hpbar);

        var hpLabel = new Label("HP: ", {
            x: 0,
            y: 0,
            style: {
                fill: 0xffffff,
                fontSize: 18,
                fontFamily: gameFont
            }
        });
        hpLabel.position.x = window.innerWidth - hpbarWidth - hpbarMargin - 15 - hpLabel.textObject.width;
        hpLabel.position.y = hpbarMargin + hpbarPadding;
        hpLabel.appendTo(this);
        
        var hpValue = new Label(player.health +"/"+ player.maxHealth, {
            x: 0,
            y: 0,
            style: {
                fill: 0x111111,
                fontSize: 18,
                fontFamily: gameFont
            }
        });
        hpValue.position.x = window.innerWidth - hpbarWidth - hpbarMargin + hpbarWidth / 2 - hpValue.textObject.width / 2;
        hpValue.position.y = hpbarMargin + hpbarPadding;
        hpValue.appendTo(this);
    }

    private initListeners(): void {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape" && this.renderer.currentMenu === MenuType.INGAME) {
                this.game.saveProgress();
                this.renderer.setMenu(MenuType.MAIN);
            }
        });
    }

    public update(delta: number): void {
        this.game.update(delta, this.gameFrame);
    }
}
