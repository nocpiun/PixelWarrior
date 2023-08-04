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

    private inputBox: Input;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.initListeners();
    }

    public init(): void {
        this.addChild(MenuBackground());

        // Title
        var title = new Label("输入玩家名", {
            x: 0,
            y: 150,
            style: {
                fill: 0xffffff,
                fontSize: 32,
                fontFamily: gameFont
            }
        });
        title.position.x = window.innerWidth / 2 - title.textObject.width / 2;
        title.appendTo(this);

        // Notes
        var notes = new Label("仅允许大小写英文字母、数字、下划线和连词符", {
            x: 0,
            y: 300,
            style: {
                fill: 0xcccccc,
                fontSize: 16,
                fontFamily: gameFont
            }
        });
        notes.position.x = window.innerWidth / 2 - notes.textObject.width / 2;
        notes.appendTo(this);

        // Input Box
        this.inputBox = new Input({
            x: 0,
            y: 240,
            width: 370,
            height: 40,
            defaultValue: Storage.get().getItem("pw.name") ?? undefined
        });
        this.inputBox.position.x = window.innerWidth / 2 - this.inputBox.background.width / 2;
        this.inputBox.appendTo(this);
        
        // Login Button
        var loginButton = new Button({
            text: "登录",
            textStyle: ButtonTextStyle,
            width: 370,
            height: 40,
            x: 0,
            y: 270,
            style: CommonButtonStyle,
            onClick: () => this.login()
        });
        loginButton.position.x = window.innerWidth / 2 - loginButton.background.width / 2;
        loginButton.appendTo(this);

        this.inputBox.focus();
    }

    private initListeners(): void {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Enter" && this.renderer.currentMenu === MenuType.LOGIN) {
                this.login();
            }
        });
    }

    private login(): void {
        if(this.inputBox.value === "") return;

        Storage.get().setItem("pw.name", this.inputBox.value);
        this.renderer.setMenu(MenuType.MAIN);
    }

    public update(): void {
        
    }
}
