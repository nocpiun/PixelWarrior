import * as PIXI from "pixijs";

import Player from "./Player";

import { Skin, EntityAnimation, Towards } from "../../../types";

const standingAnimation: PIXI.Texture[] = [
    PIXI.Texture.from("/assets/textures/player/teo/standing/1.png"),
    PIXI.Texture.from("/assets/textures/player/teo/standing/2.png"),
    PIXI.Texture.from("/assets/textures/player/teo/standing/3.png"),
    PIXI.Texture.from("/assets/textures/player/teo/standing/4.png"),
    PIXI.Texture.from("/assets/textures/player/teo/standing/5.png"),
    PIXI.Texture.from("/assets/textures/player/teo/standing/6.png"),
];

const walkingAnimation: PIXI.Texture[] = [
    PIXI.Texture.from("/assets/textures/player/teo/walking/1.png"),
    PIXI.Texture.from("/assets/textures/player/teo/walking/2.png"),
    PIXI.Texture.from("/assets/textures/player/teo/walking/3.png"),
    PIXI.Texture.from("/assets/textures/player/teo/walking/4.png"),
    PIXI.Texture.from("/assets/textures/player/teo/walking/5.png"),
    PIXI.Texture.from("/assets/textures/player/teo/walking/6.png"),
];

export default class Teo extends Player {

    public constructor(x: number, y: number, towards: Towards) {
        super(x, y, towards);

        this.width = 80;
        this.height = 176;
        this.playAnimation(EntityAnimation.STANDING);
    }

    public getSkin(): Skin {
        return Skin.TEO;
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
