import * as PIXI from "pixijs";

import Component from "./Component";

import type { ListOption, ListItemOption } from "../../types";
import { gameFont } from "../style";

export default class List extends Component<ListOption> {
    private option: ListOption;
    public background = new PIXI.Graphics();
    public textObject: PIXI.Text;

    public constructor(option?: ListOption) {
        super(option);

        this.option = option;
        
        this.background.lineStyle(2, this.option.style.borderColor);
        this.background.drawRect(this.option.x, this.option.y, this.option.width, this.option.height);
        this.addChild(this.background);

        for(let i = 0; i < this.option.list.length; i++) {
            this.addChild(this.option.list[i]);
        }
    }

    public addItem(item: ListItem): void {
        this.option.list.push(item);
        item.appendTo(this);
    }
}

export class ListItem extends Component<ListItemOption> {
    private option: ListItemOption;
    public background = new PIXI.Graphics();
    public textObject: PIXI.Text;
    public detailsTextObject: PIXI.Text;

    public constructor(option?: ListItemOption) {
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

        this.textObject = new PIXI.Text(option.text, {
            fill: 0xeeeeee,
            fontSize: 17,
            fontFamily: gameFont,
        });
        this.textObject.x = option.x + 10;
        this.textObject.y = option.y + 13;
        this.addChild(this.textObject);

        this.detailsTextObject = new PIXI.Text(option.details, {
            fill: 0x999999,
            fontSize: 17,
            fontFamily: gameFont,
        });
        this.detailsTextObject.x = option.x + 10;
        this.detailsTextObject.y = option.y + this.textObject.height + 25;
        this.addChild(this.detailsTextObject);
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
