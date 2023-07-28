import * as PIXI from "pixijs";

import { Towards, EntityAnimation } from "../../types";

export default abstract class Entity {
    protected static delta: number = 200; // ms

    public x: number;
    public y: number;
    public towards: Towards;

    // Timers
    protected animation: NodeJS.Timer | null;
    private walking: NodeJS.Timer | null;

    protected frameIndex: number = 0;
    protected frameList: PIXI.Texture[];
    public skinTexture: PIXI.Texture;
    
    protected constructor(x: number, y: number, towards: Towards) {
        this.x = x;
        this.y = y;
        this.towards = towards;
    }

    public walk(towards: Towards): void {
        this.towards = towards;
        this.playAnimation(towards === Towards.LEFT ? EntityAnimation.WALKING_LEFT : EntityAnimation.WALKING_RIGHT);

        this.walking = setInterval(() => {
            switch(towards) {
                case Towards.LEFT:
                    this.x -= 5;
                    break;
                case Towards.RIGHT:
                    this.x += 5;
                    break;
            }
        }, Entity.delta);
    }

    public stopWalking(): void {
        clearInterval(this.walking);
        this.walking = null;
    }

    public abstract playAnimation(animation: EntityAnimation): void;

    protected registerAnimationTimer() {
        this.animation = setInterval(() => {
            this.skinTexture = this.frameList[this.frameIndex];

            this.frameIndex++;
            if(this.frameIndex === this.frameList.length) {
                this.frameIndex = 0;
            }
        }, Entity.delta);
    }

    public stopAnimation(): void {
        clearInterval(this.animation);
        this.animation = null;
        this.frameIndex = 0;
    }
}
