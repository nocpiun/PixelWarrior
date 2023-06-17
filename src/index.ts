import * as PIXI from "pixijs";
import Main from "./Main";

new Main(new PIXI.Application({
    antialias: true,
    autoDensity: true,
    resolution: 2,
}));
