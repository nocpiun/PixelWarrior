import * as PIXI from "pixijs";
import { Loader } from "@pixi/loaders";

import Renderer from "./game/Renderer";
import { MenuType } from "./types";
import Utils from "./utils/Utils";

import MinecraftAEFont from "./assets/fonts/Minecraft AE.woff";

export default class Main {
    private app: PIXI.Application;
    private renderer: Renderer;

    private loader: Loader = new Loader();
    private texturePromises: Promise<any>[] = [];
    private loadingProgress: number = 0;

    public constructor(app: PIXI.Application) {
        this.app = app;

        this.init();
    }

    private async init(): Promise<void> {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.app.view as HTMLCanvasElement);

        // Prevent rightclick contextmenu
        // (this.app.view as HTMLCanvasElement).addEventListener("contextmenu", (e) => e.preventDefault());

        this.renderer = new Renderer(this.app);
        
        await this.loadTextures();

        this.loader.load(() => {
            this.app.ticker.add((delta) => {
                this.renderer.update(delta);
            });
        });
    }

    private async loadTextures(): Promise<void> {
        this.loader.defaultQueryString = "v="+ Utils.getRandom(1000000, 9999999);

        // Fonts
        this.loader.add("Minecraft AE", MinecraftAEFont);

        // Textures
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/background/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/8.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/9.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/10.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/activated/11.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/angry/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/angry/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/angry/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/angry/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/angry/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/angry/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/standing/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/standing/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/standing/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/standing/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/standing/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/standing/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/darken/standing/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/8.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/activated/9.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/angry/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/angry/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/angry/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/angry/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/angry/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/angry/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/angry/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/standing/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/standing/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/boss/grelyne/standing/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/cone/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/ice/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/ice/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill1/8.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/8.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/9.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/10.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/skill2/11.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/standing/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/standing/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/standing/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/standing/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/standing/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/standing/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/standing/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/walking/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/walking/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/walking/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/walking/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/walking/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/kayce/walking/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/8.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/9.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/10.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/11.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/12.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/13.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/14.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill1/15.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/7.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/8.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/9.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/skill2/10.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/standing/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/standing/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/standing/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/standing/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/standing/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/standing/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/walking/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/walking/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/walking/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/walking/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/walking/5.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/player/teo/walking/6.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/portal/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/portal/2.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/portal/3.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/portal/4.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/spawnpoint/1.png"));
        this.createTextureTask(() => PIXI.Assets.load("/assets/textures/spawnpoint/2.png"));
        await Promise.all(this.texturePromises);
    }

    private createTextureTask(cb: () => Promise<any>) {
        this.texturePromises.push(cb().then((res) => {
            this.loadingProgress++;
            // Update progressbar
            this.renderer.setMenu(MenuType.LOADING, this.loadingProgress / this.texturePromises.length, res.textureCacheIds[0]);
        }));
    }
}
