import * as PIXI from "pixijs";

export default function Background(color: number, alpha?: number): PIXI.Graphics {
    var page = new PIXI.Graphics();
    page.beginFill(color, alpha);
    page.drawRect(0, 0, window.innerWidth, window.innerHeight);
    return page;
}
