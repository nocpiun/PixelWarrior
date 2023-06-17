import * as PIXI from "pixijs";

import Component from "./Component";

import type { ButtonOption } from "../../types";

export default class Button extends Component<ButtonOption> {
    private option: ButtonOption;
    private background = new PIXI.Graphics();

    public constructor(option?: ButtonOption) {
        super(option);

        this.option = option;

        this.interactive = true;
        this.on("click", (e) => {
            if(option.onClick) option.onClick(e);
        });
        this.on("mouseenter", () => {
            this.cursor = "pointer";
            // this.setBackgroundColor(option.style.backgroundColor);
        });
        this.on("mouseleave", () => {
            this.cursor = "default";
            this.setBackgroundColor(option.style.backgroundColor);
        });
        
        this.setBackgroundColor(option.style.backgroundColor);
        this.addChild(this.background);

        var text = new PIXI.Text(option.text, option.textStyle);
        text.x = option.x + (option.width / 2) - (text.width / 2);
        text.y = option.y + (option.height / 2) - (text.height / 2);
        this.addChild(text);
    }

    private setBackgroundColor(color: number): void {
        this.background.beginFill(color);
        this.background.drawRect(this.option.x, this.option.y, this.option.width, this.option.height);
    }
}
