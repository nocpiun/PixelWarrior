import Menu from "./Menu";
import Game from "../Game";
import Renderer from "../Renderer";

import { MenuType } from "../../types";

export default class InGameMenu extends Menu {
    private renderer: Renderer;
    private game: Game;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.initListeners();
    }

    public init(game: Game): void {
        this.game = game;

        // Game GUI
        /** @todo */
    }

    private initListeners(): void {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape" && this.renderer.currentMenu === MenuType.INGAME) {
                this.game.saveProgress();
                this.renderer.setMenu(MenuType.MAIN);
            }
        });
    }

    public update(delta: number): void {
        this.game.update(delta, this);
    }
}
