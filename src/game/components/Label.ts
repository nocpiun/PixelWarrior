import * as PIXI from "pixijs";

import Component from "./Component";

import type { LabelOption } from "../../types";
import { gameFont } from "../style";

const tooltipPadding: number = 7;

export default class Label extends Component<LabelOption> {
    public textObject: PIXI.Text;
    public tooltipObject: PIXI.Graphics;
    private tooltipLabel: PIXI.Text;

    public constructor(text: string, option?: LabelOption, tooltip?: string) {
        super(option);

        this.textObject = new PIXI.Text(text, option.style);
        this.textObject.x = option.x / 2;
        this.textObject.y = option.y / 2;
        this.textObject.interactive = true;
        this.textObject.on("mouseenter", (e) => {
            if(!tooltip) return;
            this.tooltipObject.visible = true;
            this.updateTooltipObject(e.client.x - this.position.x, e.client.y - this.position.y);
        });
        this.textObject.on("mousemove", (e) => {
            if(!tooltip) return;
            this.updateTooltipObject(e.client.x - this.position.x, e.client.y - this.position.y);
        });
        this.textObject.on("mouseleave", () => {
            if(!tooltip) return;
            this.tooltipObject.visible = false;
            this.tooltipObject.clear();
        });
        this.addChild(this.textObject);

        if(tooltip) {
            this.tooltipObject = new PIXI.Graphics();
            this.tooltipObject.visible = false;
            this.addChild(this.tooltipObject);
    
            this.tooltipLabel = new PIXI.Text(tooltip, {
                fill: 0x9e9e9e,
                fontSize: 16,
                fontFamily: gameFont
            });
            this.tooltipObject.addChild(this.tooltipLabel);
        }
    }

    public setText(text: string): void {
        this.textObject.text = text;
    }

    private updateTooltipObject(x: number, y: number): void {
        this.tooltipObject.clear();

        this.tooltipObject.beginFill(0x000000);
        this.tooltipObject.drawRoundedRect(x, y, this.tooltipLabel.width + 2 * tooltipPadding, this.tooltipLabel.height + 2 * tooltipPadding, 2);
        this.tooltipLabel.position.x = x + tooltipPadding;
        this.tooltipLabel.position.y = y + tooltipPadding;
    }
}
