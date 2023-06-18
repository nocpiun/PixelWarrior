import * as PIXI from "pixijs";

export default abstract class Menu extends PIXI.Container {
    public constructor() {
        super();

        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    public abstract update(delta?: number): void;

    public appendTo(container: PIXI.Container): void {
        container.addChild(this);
    }

    public removeFrom(container: PIXI.Container): void {
        container.removeChild(this);
    }
}
