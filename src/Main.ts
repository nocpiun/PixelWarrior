import * as PIXI from "pixijs";
import { Loader } from "@pixi/loaders";

import Renderer from "./game/Renderer";
import { MenuType } from "./types";

import MinecraftAEFont from "./assets/fonts/Minecraft AE.woff";

export default class Main {
    private app: PIXI.Application;
    private renderer: Renderer;

    private loader: Loader = new Loader();

    public constructor(app: PIXI.Application) {
        this.app = app;

        this.loadTextures();
        this.init();
    }

    private init(): void {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.app.view as HTMLCanvasElement);

        // Prevent rightclick contextmenu
        // (this.app.view as HTMLCanvasElement).addEventListener("contextmenu", (e) => e.preventDefault());

        this.loader.load(() => {
            this.renderer = new Renderer(this.app);
            this.renderer.setMenu(MenuType.MAIN);
            this.app.ticker.add((delta) => {
                this.renderer.update(delta);
            });
        });
    }

    private loadTextures(): void {
        // Fonts
        this.loader.add("Minecraft AE", MinecraftAEFont);
    }
}
