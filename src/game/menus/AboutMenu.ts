import * as PIXI from "pixijs";

import Menu from "./Menu";

import Label from "../components/Label";
import PageContainer from "../components/PageContainer";
import { MenuBackground } from "../components/Background";

import Renderer from "../Renderer";
import { MenuType } from "../../types";
import { gameFont, AboutItemTextStyle } from "../style";
import { version } from "../../global";

export default class AboutMenu extends Menu {
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
        var title = new Label("关于", {
            x: 0,
            y: 50,
            style: {
                fill: 0xffffff,
                fontSize: 30,
                fontFamily: gameFont
            }
        });
        title.textObject.position._x = window.innerWidth / 2 - title.textObject.width / 2;
        title.appendTo(this);

        const itemTop = 130;
        const itemMargin = 24; // item height included

        // About Items
        this.addChild(aboutItem("Description", "PixelWarrior is a rogue game.", itemTop));
        this.addChild(aboutItem("Author", "NoahHrreion", itemTop + itemMargin));
        this.addChild(aboutItem("Version", version, itemTop + 2 * itemMargin));
        this.addChild(aboutItem("Github Repo", "https://github.com/nocpiun/PixelWarrior", itemTop + 3 * itemMargin));
        this.addChild(aboutItem("Dependencies", "pixi.js  [https://pixijs.com]", itemTop + 4 * itemMargin));
        this.addChild(aboutItem("", "webpack  [https://webpack.js.org]", itemTop + 5 * itemMargin));
        this.addChild(aboutItem("", "typescript  [https://typescriptlang.org]", itemTop + 6 * itemMargin));
        this.addChild(aboutItem("", "bump.js  [https://github.com/kittykatattack/bump]", itemTop + 7 * itemMargin));

        // Footer
        var footer = new Label("感谢游玩 Pixel Warrior!", {
            x: 0,
            y: 0,
            style: {
                fill: 0xfaf211,
                fontSize: 25,
                fontFamily: gameFont
            }
        });
        footer.textObject.position.x = window.innerWidth / 2 - footer.textObject.width / 2;
        footer.textObject.position.y = window.innerHeight - 100;
        footer.appendTo(this);
    }

    private initListeners(): void {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape" && this.renderer.currentMenu === MenuType.ABOUT) {
                this.renderer.setMenu(MenuType.MAIN);
            }
        });
    }

    public update(): void {
        
    }
}

function aboutItem(name: string, content: string, y: number): PIXI.Graphics {
    var item = new PIXI.Graphics();

    const center = window.innerWidth / 2 - 55;
    const spaceBetween = 300;
    
    var nameLabel = new Label(name + (name.length > 0 ? ":" : ""), {
        x: 0,
        y,
        style: AboutItemTextStyle
    });
    nameLabel.textObject.position.x = center - spaceBetween / 2 - nameLabel.textObject.width;
    nameLabel.appendTo(item);

    var contentLabel = new Label(content, {
        x: 0,
        y,
        style: AboutItemTextStyle
    });
    contentLabel.textObject.position.x = center + spaceBetween / 2;
    contentLabel.appendTo(item);

    return item;
}
