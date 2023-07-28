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

        this.playAnimation(EntityAnimation.STANDING_RIGHT);
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
            case EntityAnimation.STANDING_LEFT:
                break;
            case EntityAnimation.STANDING_RIGHT:
                this.frameList = standingAnimation;
                break;
            case EntityAnimation.WALKING_LEFT:
                break;
            case EntityAnimation.WALKING_RIGHT:
                this.frameList = walkingAnimation;
                break;
        }

        this.registerAnimationTimer();
    }
}
