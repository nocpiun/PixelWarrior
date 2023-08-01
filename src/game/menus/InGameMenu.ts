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

        const barMargin = 30;

        // HP Bar
        const hpbarWidth = 450;
        const hpbarHeight = 25;
        this.addChild(bar(
            window.innerWidth - hpbarWidth - barMargin,
            barMargin,
            hpbarWidth,
            hpbarHeight,
            {
                label: "HP: ",
                value: player.health,
                maxValue: player.maxHealth,
                background: 0xf01f1f
            }
        ));

        // Defense Bar
        const defensebarWidth = 450;
        const defensebarHeight = 25;
        this.addChild(bar(
            window.innerWidth - defensebarWidth - barMargin,
            hpbarHeight + barMargin * 2,
            defensebarWidth,
            defensebarHeight,
            {
                label: "防御: ",
                value: player.defense,
                maxValue: player.maxDefense,
                background: 0xbbbbbb
            }
        ));
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

function bar(
    x: number,
    y: number,
    width: number,
    height: number, 
    option: {
        label: string,
        value: number,
        maxValue: number,
        background: number
    }): PIXI.Container {
    var container = new PIXI.Container();

    const padding = 5;
    var barBorder = new PIXI.Graphics();
    barBorder.lineStyle(5, 0xffffff);
    barBorder.drawRect(x, y, width, height);
    container.addChild(barBorder);

    var bar = new PIXI.Graphics();
    bar.beginFill(option.background);
    bar.drawRect(
        x + padding,
        y + padding,
        (width - 2 * padding) * (option.value / option.maxValue),
        height - 2 * padding
    );
    container.addChild(bar);

    var barLabel = new Label(option.label, {
        x: 0,
        y: 0,
        style: {
            fill: 0xffffff,
            fontSize: 18,
            fontFamily: gameFont
        }
    });
    barLabel.position.x = x - 15 - barLabel.textObject.width;
    barLabel.position.y = y + padding;
    barLabel.appendTo(container);

    var barValue = new Label(option.value +"/"+ option.maxValue, {
        x: 0,
        y: 0,
        style: {
            fill: 0xffffff,
            fontSize: 18,
            fontFamily: gameFont
        }
    });
    barValue.position.x = x + width / 2 - barValue.textObject.width / 2;
    barValue.position.y = y + padding;
    barValue.appendTo(container);

    return container;
}
