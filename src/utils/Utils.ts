import * as PIXI from "pixijs";
import Bump from "../lib/bump.js";

export default class Utils {
    public static getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static timeToString(time: number): string {
        var date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    public static containInScreen(sprite: PIXI.Sprite): Set<"left" | "right" | "top" | "bottom"> {
        return new Bump(PIXI).contain(sprite, { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }, false);
    }
}
