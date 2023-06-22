import Menu from "./Menu";

import Label from "../components/Label";
import PageContainer from "../components/PageContainer";
import Background from "../components/Background";

import Renderer from "../Renderer";
import { MenuType } from "../../types";
import { gameFont } from "../style";

export default class SettingsMenu extends Menu {
    private renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.init();
        this.initListeners();
    }

    public init(): void {
        this.addChild(Background(0x3d3d3d));

        // Page Container
        this.addChild(PageContainer());

        // Title
        var title = new Label("设置", {
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
