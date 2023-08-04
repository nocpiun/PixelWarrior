import * as PIXI from "pixijs";
import Bump from "../lib/bump.js";

export default class Utils {
    private static currentId: number = 0;

    public static getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static timeToString(time: number): string {
        var date = new Date(time);
        return `${
            date.getFullYear()
        }-${
            date.getMonth() + 1
        }-${
            date.getDate()
        }-${
            date.getHours() < 10 ? "0"+ date.getHours() : date.getHours()
        }:${
            date.getMinutes() < 10 ? "0"+ date.getMinutes() : date.getMinutes()
        }:${
            date.getSeconds() < 10 ? "0"+ date.getSeconds() : date.getSeconds()
        }`;
    }

    public static containInScreen(sprite: PIXI.Sprite): Set<"left" | "right" | "top" | "bottom"> {
        return new Bump(PIXI).contain(sprite, { x: -Infinity, y: 0, width: Infinity, height: window.innerHeight }, false);
    }

    public static throttle(cb: (...args: any[]) => void, delay: number): (...args: any[]) => void {
        var timer = null;
        return (...args: any[]) => {
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args);
            }, delay);
        };
    }

    public static getId(): number {
        Utils.currentId++;
        return Utils.currentId;
    }

    public static mapToArray<K, V>(map: Map<K, V>): [K, V][] {
        var result: [K, V][] = [];

        map.forEach((value, key) => {
            result.push([key, value]);
        });

        return result;
    }
}
