import * as PIXI from "pixijs";

import Menu from "./menus/Menu";
import LoadingMenu from "./menus/LoadingMenu";
import MainMenu from "./menus/MainMenu";
import SavesMenu from "./menus/SavesMenu";
import SettingsMenu from "./menus/SettingsMenu";
import AboutMenu from "./menus/AboutMenu";
import InGameMenu from "./menus/InGameMenu";
import { MenuType } from "../types";

export default class Renderer {
    private app: PIXI.Application;

    // objects
    private fpsText: PIXI.Text;
    private menus: Menu[] = [
        new LoadingMenu(), // 0
        new MainMenu(), // 1
        new SavesMenu(), // 2
        new SettingsMenu(), // 3
        new AboutMenu(), // 4
        new InGameMenu(), // 5
    ];

    private currentMenu: MenuType;

    public constructor(app: PIXI.Application) {
        this.app = app;

        this.initObjects();
    }

    private initObjects(): void {
        // FPS Text
        this.fpsText = new PIXI.Text("", {
            fontSize: 16,
            fill: 0xffffff
        });
        this.fpsText.x = 15;
        this.fpsText.y = 15;
        this.app.stage.addChild(this.fpsText);
    }

    public setMenu(menu: MenuType): void {
        this.currentMenu = menu;
    }

    public update(delta: number): void {
        this.fpsText.text = "FPS: "+ this.app.ticker.FPS.toFixed(0);
    }
}
