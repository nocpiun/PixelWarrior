import * as PIXI from "pixijs";

import Menu from "./menus/Menu";
import LoadingMenu from "./menus/LoadingMenu";
import MainMenu from "./menus/MainMenu";
import SavesMenu from "./menus/SavesMenu";
import SettingsMenu from "./menus/SettingsMenu";
import AboutMenu from "./menus/AboutMenu";
import InGameMenu from "./menus/InGameMenu";

import Label from "./components/Label";
import Button from "./components/Button";

import type { MenuType } from "../types";

export default class Renderer {
    public app: PIXI.Application;

    // objects
    private fpsText: Label;
    private testbtn: Button;
    private menus: Menu[];

    private currentMenu: MenuType;

    public constructor(app: PIXI.Application) {
        this.app = app;
        this.menus = [
            new LoadingMenu(), // 0
            new MainMenu(this), // 1
            new SavesMenu(), // 2
            new SettingsMenu(), // 3
            new AboutMenu(), // 4
            new InGameMenu(), // 5
        ];

        this.initObjects();
    }

    private initObjects(): void {
        // FPS Text
        this.fpsText = new Label("", {
            x: 15,
            y: 15,
            style: {
                fill: 0xffffff,
                fontSize: 16,
            }
        });
        this.fpsText.appendTo(this.app.stage);
    }

    public setMenu(menu: MenuType): void {
        this.currentMenu = menu;
        this.removeAllMenu();
        this.menus[this.currentMenu].appendTo(this.app.stage);
    }

    public removeAllMenu(): void {
        for(let i = 0; i < this.menus.length; i++) {
            this.menus[i].removeFrom(this.app.stage);
        }
    }

    public update(delta: number): void {
        this.fpsText.setText("FPS: "+ this.app.ticker.FPS.toFixed(0));
        this.menus[this.currentMenu].update(delta);
    }
}
