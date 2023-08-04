import * as PIXI from "pixijs";

import Menu from "./Menu";
import Renderer from "../Renderer";
import Settings from "../Settings";

import Label from "../components/Label";
import Switcher from "../components/Switcher";
import Component from "../components/Component";
import PageContainer from "../components/PageContainer";
import { MenuBackground } from "../components/Background";

import { ComponentOption, MenuType, Skin } from "../../types";
import { gameFont, PlainTextStyle, CommonButtonStyle } from "../style";

export default class SettingsMenu extends Menu {
    private renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.initListeners();
    }

    public init(): void {
        this.addChild(MenuBackground());

        // Page Container
        this.addChild(PageContainer());

        // Title
        var title = new Label("设置", {
            x: 0,
            y: 50,
            style: {
                fill: 0xffffff,
                fontSize: 32,
                fontFamily: gameFont
            }
        });
        title.textObject.position._x = window.innerWidth / 2 - title.textObject.width / 2;
        title.appendTo(this);

        // Contents
        const itemTop = 130;
        const itemMargin = 24; // item height included
        const componentWidth = 340;
        const componentHeight = 40;

        // Player Skin
        const skinList = ["Teo", "Kayce"];
        this.addChild(settingsItem("玩家皮肤", new Switcher({
            x: 0,
            y: 50,
            width: componentWidth,
            height: componentHeight,
            textStyle: {
                fill: 0xeeeeee,
                fontSize: 16,
                fontFamily: gameFont,
            },
            style: CommonButtonStyle,
            values: skinList,
            defaultIndex: skinList.indexOf(Settings.get().getValue("player.skin")),
            onChange: (value) => {
                Settings.get().setValue("player.skin", value);
            }
        }), itemTop, "更换皮肤后相应的技能也会改变"));
    }

    private initListeners(): void {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape" && this.renderer.currentMenu === MenuType.SETTINGS) {
                this.renderer.setMenu(MenuType.MAIN);
            }
        });
    }

    public update(): void {
        
    }
}

function settingsItem(name: string, component: Component<ComponentOption>, y: number, description?: string): PIXI.Container {
    var item = new PIXI.Container();

    const center = window.innerWidth / 2 - 55;
    const spaceBetween = 300;

    var nameLabel = new Label(name, {
        x: 0,
        y,
        style: PlainTextStyle
    }, description);
    nameLabel.textObject.position.x = center - spaceBetween / 2 - nameLabel.textObject.width;
    nameLabel.appendTo(item);

    component.position.x = center + spaceBetween / 2;
    component.position.y = y;
    component.appendTo(item);

    return item;
}
