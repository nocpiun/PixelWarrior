import * as PIXI from "pixijs";

import Menu from "./Menu";
import Label from "../components/Label";

import Renderer from "../Renderer";
import { MenuType } from "../../types";

export default class LoadingMenu extends Menu {
    private renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
    }

    public init(progress: number, currentResource: string): void {
        var gameTitle = new Label("Pixel Warrior", {
            x: 0,
            y: 0,
            style: {
                fill: 0xffffff,
                fontSize: 45,
                fontFamily: "Consolas",
                align: "center"
            }
        });
        gameTitle.textObject.position.x = window.innerWidth / 2 - gameTitle.textObject.width / 2;
        gameTitle.textObject.position.y = window.innerHeight / 2 - gameTitle.textObject.height / 2;
        gameTitle.appendTo(this);

        var loadingLabel = new Label("Loading: "+ currentResource, {
            x: 0,
            y: 0,
            style: {
                fill: 0xffffff,
                fontSize: 19,
                fontFamily: "Consolas",
                align: "center"
            }
        });
        loadingLabel.textObject.position.x = window.innerWidth / 2 - loadingLabel.textObject.width / 2;
        loadingLabel.textObject.position.y = window.innerHeight / 2 - loadingLabel.textObject.height / 2 + 75;
        loadingLabel.appendTo(this);

        const progressbarWidth = 600;
        const progressbarHeight = 30;
        const progressbarPadding = 5;
        var progressbarBorder = new PIXI.Graphics();
        progressbarBorder.lineStyle(5, 0xffffff);
        progressbarBorder.drawRect(
            window.innerWidth / 2 - progressbarWidth / 2,
            window.innerHeight / 2 - progressbarHeight / 2 + 150,
            progressbarWidth,
            progressbarHeight
        );
        this.addChild(progressbarBorder);

        var progressbar = new PIXI.Graphics();
        progressbar.beginFill(0xffffff);
        progressbar.drawRect(
            window.innerWidth / 2 - progressbarWidth / 2 + progressbarPadding,
            window.innerHeight / 2 - progressbarHeight / 2 + 150 + progressbarPadding,
            (progressbarWidth - 2 * progressbarPadding) * progress,
            progressbarHeight - 2 * progressbarPadding
        );
        this.addChild(progressbar);
    }

    // `update()` will be called when all of the resources are loaded
    public update(): void {
        this.renderer.setMenu(MenuType.MAIN);
    }
}
