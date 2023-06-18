import * as PIXI from "pixijs";

import Component from "./Component";

import type { LabelOption } from "../../types";

export default class Label extends Component<LabelOption> {
    public textObject: PIXI.Text;

    public constructor(text: string, option?: LabelOption) {
        super(option);

        this.textObject = new PIXI.Text(text, option.style);
        this.textObject.x = option.x / 2;
        this.textObject.y = option.y / 2;
        this.addChild(this.textObject);
    }

    public setText(text: string): void {
        this.textObject.text = text;
    }
}
