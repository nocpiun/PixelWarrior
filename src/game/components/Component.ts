import * as PIXI from "pixijs";

import { ComponentOption } from "../../types";

export default class Component<O extends ComponentOption> extends PIXI.Sprite {
    public constructor(option: O) {
        super();

        this.x = option.x;
        this.y = option.y;
    }

    public appendTo(container: PIXI.Container): void {
        container.addChild(this);
    }
}
