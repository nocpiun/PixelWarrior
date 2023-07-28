import * as PIXI from "pixijs";

export default function Background(color: number, alpha?: number): PIXI.Graphics {
    var page = new PIXI.Graphics();
    page.beginFill(color, alpha);
    page.drawRect(0, 0, window.innerWidth, window.innerHeight);
    return page;
}

export function MenuBackground(): PIXI.TilingSprite {
    var backgroundTile = PIXI.Texture.from("/assets/textures/background/1.png");
    var background = new PIXI.TilingSprite(backgroundTile, window.innerWidth, window.innerHeight);
    
    // filter
    var backgroundFilter = new PIXI.ColorMatrixFilter();
    backgroundFilter.brightness(0.4, true);
    background.filters = [backgroundFilter];

    return background;
}
