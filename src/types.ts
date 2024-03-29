import * as PIXI from "pixijs";
import type { ListItem } from "./game/components/List";

type TextStyleType = Partial<PIXI.ITextStyle> | PIXI.TextStyle;

export enum MenuType {
    LOADING, MAIN, SAVES, SETTINGS, ABOUT, INGAME, LOGIN
}

export interface ComponentOption {
    x?: number
    y?: number
}

export interface ComponentOptionWH extends ComponentOption {
    width: number
    height: number
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

export interface ButtonOption extends ComponentOptionWH {
    text: string
    textStyle: TextStyleType
    style?: ButtonStyle
    onClick?: (e: PIXI.FederatedPointerEvent) => any
}

export interface ListStyle {
    borderColor?: number
}

export interface ListOption extends ComponentOptionWH {
    list: ListItem[]
    style?: ListStyle
}

export interface ListItemOption extends ComponentOptionWH {
    text: string
    details: string
    style?: ButtonStyle
    onClick?: (e: PIXI.FederatedPointerEvent) => any
}

export interface InputOption extends ComponentOptionWH {
    defaultValue?: string
}

export interface SwitcherOption extends ComponentOptionWH {
    textStyle: TextStyleType
    style?: ButtonStyle
    values: string[]
    defaultIndex: number
    onChange?: (value: string) => any
}

export interface PlayerSave {
    x: number
    y: number
    towards: Towards
}

export interface RawSave {
    id: number
    time: number
    player: PlayerSave
}

export enum Skin {
    TEO = "Teo", KAYCE = "Kayce"
}

export enum Towards {
    LEFT, RIGHT
}

export enum EntityAnimation {
    STANDING,
    WALKING,
    SKILL1,
    SKILL2,
    ACTIVATED,
    ANGRY
}
