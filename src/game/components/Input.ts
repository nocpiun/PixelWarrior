import * as PIXI from "pixijs";

import Component from "./Component";
import Label from "./Label";

import { gameFont } from "../style";
import { InputOption } from "../../types";
import Utils from "../../utils/Utils";
import Emitter from "../../utils/Emitter";

const cursor: string = "_";
const maxLength: number = 25;

export default class Input extends Component<InputOption> {
    private option: InputOption;
    private id: number = Utils.getId();
    private _value: string = "";
    private isFocused: boolean = false;

    public background = new PIXI.Graphics();
    public text: Label;
    public cursorObject: Label;

    private cursorTimer: NodeJS.Timer | null = null;

    public constructor(option?: InputOption) {
        super(option);

        this.option = option;

        this.interactive = true;
        this.on("click", () => {
            this.focus();
        });
        this.on("mouseenter", () => {
            if(this.isFocused) return;

            this.setBorderColor(0xeeeeee);
            this.cursor = "text";
        });
        this.on("mouseleave", () => {
            if(this.isFocused) return;

            this.setBorderColor(0xbbbbbb);
            this.cursor = "default";
        });
        Emitter.get().on("input-focus", (id: number) => {
            if(this.id !== id) this.blur();
        });
        document.addEventListener("keydown", (e) => {
            var code = e.key.charCodeAt(0);
            if(e.key === "Backspace" && this.value.length > 0) {
                this.value = this.value.substring(0, this.value.length - 1);
            }

            if(e.key.length > 1) return;

            if(
                this.isFocused &&
                (
                    code === 45 /* - */ ||
                    code === 95 /* _ */ ||
                    (65 <= code && code <= 90) /* A~Z */ ||
                    (97 <= code && code <= 122) /* a~z */ ||
                    (48 <= code && code <= 57) /* 0~9 */
                )
            ) {
                this.value += e.key;
            }
        });
        document.addEventListener("mousedown", (e) => {
            if(
                e.pageX < this.x ||
                e.pageX > this.x + this.background.width ||
                e.pageY < this.y ||
                e.pageY > this.y + this.background.height
            ) this.blur();
        });

        this.setBackgroundColor(0x000000);
        this.setBorderColor(0xbbbbbb);
        this.addChild(this.background);

        // Text
        const paddingTop = 13;
        const paddingLeft = 10;
        this.text = new Label(this.value, {
            x: 0,
            y: 0,
            style: {
                fill: 0xffffff,
                fontSize: 16,
                fontFamily: gameFont,
            }
        });
        this.text.textObject.position.x = this.x + paddingLeft;
        this.text.textObject.position.y = this.y + paddingTop;
        this.text.appendTo(this);

        // Cursor
        this.cursorObject = new Label(cursor, {
            x: 0,
            y: 0,
            style: {
                fill: 0xffffff,
                fontSize: 16,
                fontFamily: gameFont,
            }
        });
        this.cursorObject.visible = false;
        this.cursorObject.textObject.position.y = this.text.textObject.position.y;
        this.cursorObject.appendTo(this);

        this.cursorTimer = setInterval(() => {
            if(this.isFocused) this.cursorObject.visible = !this.cursorObject.visible;
        }, 500);

        this.refreshCursorPosition();
        if(this.option.defaultValue) this.value = this.option.defaultValue;
    }

    public focus(): void {
        this.isFocused = true;
        this.cursorObject.visible = true;
        Emitter.get().emit("input-focus", this.id);

        this.setBorderColor(0xffffff);
    }

    public blur(): void {
        this.isFocused = false;
        this.cursorObject.visible = false;

        this.setBorderColor(0xbbbbbb);
    }

    set value(value: string) {
        if(value.length > maxLength) return;

        this._value = value;
        this.text.textObject.text = this._value;
        this.refreshCursorPosition();
    }

    get value(): string {
        return this._value;
    }

    public setBackgroundColor(color: number): void {
        this.background.beginFill(color);
        this.background.drawRect(this.option.x, this.option.y, this.option.width, this.option.height);
    }

    public setBorderColor(color: number): void {
        this.background.lineStyle(4, color);
        this.background.drawRect(this.option.x, this.option.y, this.option.width, this.option.height);
    }

    private refreshCursorPosition(): void {
        if(this.value.length === 0) {
            this.cursorObject.textObject.position.x = this.text.textObject.position.x;
            return;
        }

        this.cursorObject.textObject.position.x = this.text.textObject.position.x + this.text.textObject.width;
    }
}
