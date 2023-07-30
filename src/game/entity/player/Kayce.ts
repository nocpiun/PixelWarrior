import * as PIXI from "pixijs";

import Player from "./Player";

import { Skin, EntityAnimation, Towards } from "../../../types";

const standingAnimation: PIXI.Texture[] = [
    PIXI.Texture.from("/assets/textures/player/kayce/standing/1.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/standing/2.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/standing/3.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/standing/4.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/standing/5.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/standing/6.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/standing/7.png"),
];

const walkingAnimation: PIXI.Texture[] = [
    PIXI.Texture.from("/assets/textures/player/kayce/walking/1.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/walking/2.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/walking/3.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/walking/4.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/walking/5.png"),
    PIXI.Texture.from("/assets/textures/player/kayce/walking/6.png"),
];

export default class Kayce extends Player {

    public constructor(x: number, y: number, towards: Towards) {
        super(x, y, towards);

        this.width = 103;
        this.height = 176;
        this.playAnimation(EntityAnimation.STANDING);
    }

    public getSkin(): Skin {
        return Skin.KAYCE;
    }

    public useSkill1(): void {
        
    }

    public useSkill2(): void {
        
    }

    public playAnimation(animation: EntityAnimation): void {
        this.stopAnimation();

        switch(animation) {
            case EntityAnimation.STANDING:
                this.frameList = standingAnimation;
                break;
            case EntityAnimation.WALKING:
                this.frameList = walkingAnimation;
                break;
        }

        this.registerAnimationTimer();
    }

    public update(delta: number): void {
        super.update(delta);
    }
}
