import * as PIXI from "pixijs";

import Renderer from "./game/Renderer";
import { MenuType } from "./types";

export default class Main {
    private app: PIXI.Application;
    private renderer: Renderer;

    public constructor(app: PIXI.Application) {
        this.app = app;

        this.init();
        this.renderer.setMenu(MenuType.LOADING);
    }

    private init(): void {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.app.view as HTMLCanvasElement);

        this.renderer = new Renderer(this.app);
        this.app.ticker.add((delta) => {
            this.renderer.update(delta);
        });
    }
}
