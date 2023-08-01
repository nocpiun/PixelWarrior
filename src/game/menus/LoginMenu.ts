import * as PIXI from "pixijs";

import Menu from "./Menu";
import Renderer from "../Renderer";

import Label from "../components/Label";
import Button from "../components/Button";
import Input from "../components/Input";
import { MenuBackground } from "../components/Background";

import { MenuType } from "../../types";
import {
    gameFont,
    CommonButtonStyle,
    ButtonTextStyle
} from "../style";
import Storage from "../../utils/Storage";

export default class LoginMenu extends Menu {
    private renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
    }

    public init(): void {
        this.addChild(MenuBackground());

        // Title
        var title = new Label("输入玩家名", {
            x: 0,
            y: 150,
            style: {
                fill: 0xffffff,
                fontSize: 30,
                fontFamily: gameFont
            }
        });
        title.position.x = window.innerWidth / 2 - title.textObject.width / 2;
        title.appendTo(this);

        // Input Box
        var inputBox = new Input({
            x: 0,
            y: 240,
            width: 370,
            height: 40
        });
        inputBox.position.x = window.innerWidth / 2 - inputBox.background.width / 2;
        inputBox.appendTo(this);
        
        // Login Button
        var loginButton = new Button({
            text: "登录",
            textStyle: ButtonTextStyle,
            width: 370,
            height: 40,
            x: 0,
            y: 270,
            style: CommonButtonStyle,
            onClick: () => {
                Storage.get().setItem("pw.name", inputBox.value);
                this.renderer.setMenu(MenuType.MAIN);
            }
        });
        loginButton.position.x = window.innerWidth / 2 - loginButton.background.width / 2;
        loginButton.appendTo(this);
    }

    public update(): void {
        
    }
}
