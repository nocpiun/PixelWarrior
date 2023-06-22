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
        if(!this.option.style.borderColor) this.option.style.borderColor = this.option.style.backgroundColor;

        this.interactive = true;
        this.on("click", (e) => {
            if(option.onClick) option.onClick(e);
            this.cursor = "default";
        });
        this.on("mouseenter", () => {
            if(option.style.hoverBackgroundColor) this.setBackgroundColor(option.style.hoverBackgroundColor);
            if(option.style.hoverBorderColor) this.setBorderColor(option.style.hoverBorderColor);
            this.cursor = "pointer";
        });
        this.on("mouseleave", () => {
            this.setBackgroundColor(option.style.backgroundColor);
            this.setBorderColor(option.style.borderColor);
            this.cursor = "default";
        });
        
        this.setBackgroundColor(option.style.backgroundColor);
        this.setBorderColor(option.style.borderColor);
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

    public setBorderColor(color: number): void {
        this.background.lineStyle(2, color);
        this.background.drawRect(this.option.x, this.option.y, this.option.width, this.option.height);
    }

    public setText(text: string): void {
        this.textObject.text = text;
    }
}
