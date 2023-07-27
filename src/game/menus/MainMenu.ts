import * as PIXI from "pixijs";

import Menu from "./Menu";
import Save from "../Save";
import Game from "../Game";

import Label from "../components/Label";
import Button from "../components/Button";
import { MenuBackground } from "../components/Background";

import Renderer from "../Renderer";
import { MenuType } from "../../types";
import type { ButtonStyle } from "../../types";
import { gameFont, ButtonTextStyle } from "../style";

export default class MainMenu extends Menu {
    private renderer: Renderer;

    private title: Label;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.init();
    }

    public init(): void {
        // this.addChild(Background(0x3d3d3d));
        // Background
        this.addChild(MenuBackground());

        // Title
        this.title = new Label("Pixel Warrior", {
            x: 0,
            y: 0, // Move to y170 later
            style: {
                fill: 0xffffff,
                fontSize: 56,
                fontFamily: gameFont
            }
        });
        this.title.textObject.position.x = window.innerWidth - this.title.textObject.width - 270;
        this.title.textObject.position.y = -this.title.textObject.height;
        this.title.appendTo(this);

        // Copyright
        var copyright = new Label("Copyright (c) NoahHrreion "+ new Date().getFullYear(), {
            x: 30,
            y: 0,
            style: {
                fill: 0xdddddd,
                fontSize: 16,
                fontFamily: gameFont,
                align: "left"
            }
        });
        copyright.textObject.position.y = window.innerHeight - copyright.textObject.height - 30;
        copyright.appendTo(this);

        // Button Group
        const buttonWidth = 340;
        const buttonHeight = 50;
        const buttonMargin = 15;
        const buttonTop = 150;
        const buttonStyle: ButtonStyle = {
            backgroundColor: 0x333333,
            borderColor: 0x636363,
            hoverBackgroundColor: 0x222222,
            hoverBorderColor: 0x43c91a
        };

        var newGameButton = new Button({
            text: "新游戏",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: buttonStyle,
            onClick: () => {
                // Create a new save
                var save = Save.create();

                // Create a game object and then launch the InGameMenu by it
                this.renderer.setMenu(MenuType.INGAME, new Game(save));
            }
        });
        newGameButton.position._x = this.title.textObject.position._x + this.title.textObject.width / 2 - newGameButton.background.width / 2;
        newGameButton.position._y = buttonTop;
        newGameButton.appendTo(this);

        var savesButton = new Button({
            text: "存档",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: buttonStyle,
            onClick: () => {
                this.renderer.setMenu(MenuType.SAVES);
            }
        });
        savesButton.position._x = this.title.textObject.position._x + this.title.textObject.width / 2 - savesButton.background.width / 2;
        savesButton.position._y = buttonTop + (buttonHeight + buttonMargin);
        savesButton.appendTo(this);

        var settingsButton = new Button({
            text: "设置",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: buttonStyle,
            onClick: () => {
                this.renderer.setMenu(MenuType.SETTINGS);
            }
        });
        settingsButton.position._x = this.title.textObject.position._x + this.title.textObject.width / 2 - settingsButton.background.width / 2;
        settingsButton.position._y = buttonTop + 2 * (buttonHeight + buttonMargin);
        settingsButton.appendTo(this);

        var aboutButton = new Button({
            text: "关于",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: buttonStyle,
            onClick: () => {
                this.renderer.setMenu(MenuType.ABOUT);
            }
        });
        aboutButton.position._x = this.title.textObject.position._x + this.title.textObject.width / 2 - aboutButton.background.width / 2;
        aboutButton.position._y = buttonTop + 3 * (buttonHeight + buttonMargin);
        aboutButton.appendTo(this);
    }

    public update(delta: number): void {
        // Title Animation
        if(this.title.textObject.position.y < 170) this.title.textObject.position.y += 10 * delta;
    }
}
