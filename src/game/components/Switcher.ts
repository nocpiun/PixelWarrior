import * as PIXI from "pixijs";

import Button from "./Button";

import type { SwitcherOption } from "../../types";

export default class Switcher extends Button {
    public values: string[];
    private _value: string = "";
    private changeHandler: (value: string) => any | null = null;

    public constructor(option: SwitcherOption) {
        super({
            ...option,
            text: option.values[option.defaultIndex || 0],
            onClick: () => this.handleClick()
        });

        this.values = option.values;
        this.index = option.defaultIndex || 0;
        if(option.onChange) this.changeHandler = option.onChange;
    }

    private handleClick(): void {
        if(this.index < this.values.length - 1) {
            this.index++;
            return;
        }

        this.index = 0;
    }

    set index(index: number) {
        this._value = this.values[index];
        this.textObject.text = this._value;
        this.updateTextPosition();
        if(this.changeHandler) this.changeHandler(this._value);
    }

    get index(): number {
        return this.values.indexOf(this._value);
    }
}
