import * as PIXI from "pixijs";

import Component from "./Component";

import type { ButtonOption } from "../../types";

export default class Button extends Component<ButtonOption> {
    private option: ButtonOption;
    public background = new PIXI.Graphics();
    public textObject: PIXI.Text;

    public constructor(option?: ButtonOption) {
        super(option);

        this.option = option;

        this.interactive = true;
        this.on("click", (e) => {
            if(option.onClick) option.onClick(e);
            this.cursor = "default";
        });
        this.on("mouseenter", () => {
            if(option.style.hoverBackgroundColor) this.setBackgroundColor(option.style.hoverBackgroundColor);
            this.cursor = "pointer";
        });
        this.on("mouseleave", () => {
            this.cursor = "default";
            this.setBackgroundColor(option.style.backgroundColor);
        });
        
        this.setBackgroundColor(option.style.backgroundColor);
        this.addChild(this.background);

        this.textObject = new PIXI.Text(option.text, option.textStyle);
        this.textObject.x = option.x + (option.width / 2) - (this.textObject.width / 2);
        this.textObject.y = option.y + (option.height / 2) - (this.textObject.height / 2);
        this.addChild(this.textObject);
    }

    public setBackgroundColor(color: number): void {
        this.background.beginFill(color);
        this.background.drawRect(this.option.x, this.option.y, this.option.width, this.option.height);
    }

    public setText(text: string): void {
        this.textObject.text = text;
    }
}
