import * as PIXI from "pixijs";

import Menu from "./menus/Menu";
import LoadingMenu from "./menus/LoadingMenu";
import MainMenu from "./menus/MainMenu";
import SavesMenu from "./menus/SavesMenu";
import SettingsMenu from "./menus/SettingsMenu";
import AboutMenu from "./menus/AboutMenu";
import InGameMenu from "./menus/InGameMenu";
import LoginMenu from "./menus/LoginMenu";

import Label from "./components/Label";
import Button from "./components/Button";

import type { MenuType } from "../types";

export default class Renderer {
    public app: PIXI.Application;

    // objects
    private fpsText: Label;
    private testbtn: Button;
    private menus: Menu[];

    public currentMenu: MenuType;

    public constructor(app: PIXI.Application) {
        this.app = app;
        this.menus = [
            new LoadingMenu(this), // 0
            new MainMenu(this), // 1
            new SavesMenu(this), // 2
            new SettingsMenu(this), // 3
            new AboutMenu(this), // 4
            new InGameMenu(this), // 5
            new LoginMenu(this), // 6
        ];

        this.initObjects();
    }

    private initObjects(): void {
        this.app.stage.removeChild(this.fpsText);

        // FPS Text
        this.fpsText = new Label("", {
            x: 0,
            y: 15,
            style: {
                fill: 0xffffff,
                fontSize: 16,
            }
        });
        this.fpsText.position.x = window.innerWidth - 15 - this.fpsText.textObject.width;
        this.fpsText.appendTo(this.app.stage);
    }

    public setMenu(menu: MenuType, ...args: any[]): void {
        this.currentMenu = menu;
        this.removeAllMenu();

        var menuContainer = this.menus[this.currentMenu];
        menuContainer.removeChildren();
        menuContainer.init(...args);
        menuContainer.appendTo(this.app.stage);

        this.initObjects();
    }

    public removeAllMenu(): void {
        for(let i = 0; i < this.menus.length; i++) {
            this.menus[i].removeFrom(this.app.stage);
        }
    }

    public update(delta: number): void {
        this.menus[this.currentMenu].update(delta);
        this.fpsText.setText(`FPS: ${this.app.ticker.FPS.toFixed(1)} / ${this.app.ticker.maxFPS.toFixed(1)}`);
        this.fpsText.position.x = window.innerWidth - 15 - this.fpsText.textObject.width;
    }
}
