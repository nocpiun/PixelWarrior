import Menu from "./Menu";

import Label from "../components/Label";
import Button from "../components/Button";

import Renderer from "../Renderer";
import { MenuType } from "../../types";
import { gameFont, ButtonTextStyle } from "../style";

export default class MainMenu extends Menu {
    private renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.init();
    }

    private init(): void {
        // Title
        var title = new Label("Pixel Warrior", {
            x: 0,
            y: 100,
            style: {
                fill: 0xffffff,
                fontSize: 55,
                fontFamily: gameFont
            }
        });
        title.textObject.position._x = window.innerWidth - title.textObject.width - 270;
        title.appendTo(this);

        // Copyright
        var copyright = new Label("Copyright (c) NoahHrreion "+ new Date().getFullYear(), {
            x: 30,
            y: 0,
            style: {
                fill: 0xdddddd,
                fontSize: 15,
                fontFamily: gameFont,
                align: "left"
            }
        });
        copyright.textObject.position._y = window.innerHeight - copyright.textObject.height - 30;
        copyright.appendTo(this);

        // Button Group
        const buttonWidth = 340;
        const buttonHeight = 50;
        const buttonMargin = 15;
        const buttonTop = 150;
        const buttonBg = 0xffffff;
        const buttonHoverBg = 0xcccccc;

        var newGameButton = new Button({
            text: "New Game",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: {
                backgroundColor: buttonBg,
                hoverBackgroundColor: buttonHoverBg
            },
            onClick: () => {
                /** @todo */
            }
        });
        newGameButton.position._x = title.textObject.position._x + title.textObject.width / 2 - newGameButton.background.width / 2;
        newGameButton.position._y = buttonTop;
        newGameButton.appendTo(this);

        var savesButton = new Button({
            text: "Saves",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: {
                backgroundColor: buttonBg,
                hoverBackgroundColor: buttonHoverBg
            },
            onClick: () => {
                this.renderer.setMenu(MenuType.SAVES);
            }
        });
        savesButton.position._x = title.textObject.position._x + title.textObject.width / 2 - savesButton.background.width / 2;
        savesButton.position._y = buttonTop + (buttonHeight + buttonMargin);
        savesButton.appendTo(this);

        var settingsButton = new Button({
            text: "Settings",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: {
                backgroundColor: buttonBg,
                hoverBackgroundColor: buttonHoverBg
            },
            onClick: () => {
                this.renderer.setMenu(MenuType.SETTINGS);
            }
        });
        settingsButton.position._x = title.textObject.position._x + title.textObject.width / 2 - settingsButton.background.width / 2;
        settingsButton.position._y = buttonTop + 2 * (buttonHeight + buttonMargin);
        settingsButton.appendTo(this);

        var aboutButton = new Button({
            text: "About",
            textStyle: ButtonTextStyle,
            width: buttonWidth,
            height: buttonHeight,
            x: 0,
            y: 240,
            style: {
                backgroundColor: buttonBg,
                hoverBackgroundColor: buttonHoverBg
            },
            onClick: () => {
                this.renderer.setMenu(MenuType.ABOUT);
            }
        });
        aboutButton.position._x = title.textObject.position._x + title.textObject.width / 2 - aboutButton.background.width / 2;
        aboutButton.position._y = buttonTop + 3 * (buttonHeight + buttonMargin);
        aboutButton.appendTo(this);
    }

    public update(): void {
        
    }
}
