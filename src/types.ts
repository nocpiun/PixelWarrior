import * as PIXI from "pixijs";

type TextStyleType = Partial<PIXI.ITextStyle> | PIXI.TextStyle;

export enum MenuType {
    LOADING, MAIN, SAVES, SETTINGS, ABOUT, INGAME
}

export interface ComponentOption {
    x?: number
    y?: number
}

export interface LabelOption extends ComponentOption {
    style?: TextStyleType
}

export interface ButtonStyle {
    backgroundColor: number
    borderColor?: number
    hoverBackgroundColor?: number
    hoverBorderColor?: number
}

export interface ButtonOption extends ComponentOption {
    width: number
    height: number
    text: string
    textStyle: TextStyleType
    style?: ButtonStyle
    onClick?: (e: PIXI.FederatedPointerEvent) => any
}

export interface RawSave {
    
}
