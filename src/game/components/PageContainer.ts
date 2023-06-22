import * as PIXI from "pixijs";

const pageWidth = window.innerWidth * .75;
const pageHeight = window.innerHeight;

export default function PageContainer(): PIXI.Graphics {
    var page = new PIXI.Graphics();
    page.lineStyle(2, 0x555555);
    page.beginFill(0x111111, .3);
    page.drawRect(window.innerWidth / 2 - pageWidth / 2, -2, pageWidth, pageHeight + 4);
    return page;
}
