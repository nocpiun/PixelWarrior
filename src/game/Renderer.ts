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
    private app: PIXI.Application;

    // objects
    private fpsText: Label;
    private testbtn: Button;
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
        this.fpsText = new Label("", {
            x: 15,
            y: 15,
            style: {
                fill: 0xffffff,
                fontSize: 16,
            }
        });
        this.fpsText.appendTo(this.app.stage);

        // Test Button
        this.testbtn = new Button({
            text: "Hello World",
            textStyle: {
                fill: 0x000000,
                fontSize: 20,
            },
            width: 150,
            height: 80,
            x: 100,
            y: 100,
            style: {
                backgroundColor: 0xffffff
            },
            onClick(e) {
                alert("Hello!");
            }
        });
        this.testbtn.appendTo(this.app.stage);
    }

    public setMenu(menu: MenuType): void {
        this.currentMenu = menu;
    }

    public update(delta: number): void {
        this.fpsText.setText("FPS: "+ this.app.ticker.FPS.toFixed(0) +", Delta: "+ delta.toFixed(2));
    }
}
