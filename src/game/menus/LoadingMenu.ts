import Menu from "./Menu";

import Label from "../components/Label";

import Renderer from "../Renderer";
import { MenuType } from "../../types";

export default class LoadingMenu extends Menu {
    private renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.init();
    }

    public init(): void {
        var gameTitle = new Label("Pixel Warrior", {
            x: 0,
            y: 0,
            style: {
                fill: 0xffffff,
                fontSize: 45,
                fontFamily: "Consolas",
                align: "center"
            }
        });
        gameTitle.textObject.position.x = window.innerWidth / 2 - gameTitle.textObject.width / 2;
        gameTitle.textObject.position.y = window.innerHeight / 2 - gameTitle.textObject.height / 2;
        gameTitle.appendTo(this);

        var loadingLabel = new Label("Loading...", {
            x: 0,
            y: 0,
            style: {
                fill: 0xffffff,
                fontSize: 25,
                fontFamily: "Consolas",
                align: "center"
            }
        });
        loadingLabel.textObject.position.x = window.innerWidth / 2 - loadingLabel.textObject.width / 2;
        loadingLabel.textObject.position.y = window.innerHeight / 2 - loadingLabel.textObject.height / 2 + 75;
        loadingLabel.appendTo(this);
    }

    public update(): void {
        this.renderer.setMenu(MenuType.MAIN);
    }
}
