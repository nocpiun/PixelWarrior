import * as PIXI from "pixijs";

import { Towards, EntityAnimation } from "../../types";

export default abstract class Entity extends PIXI.Sprite {
    protected static delta: number = 200; // ms

    private _towards: Towards;
    private isWalking: boolean = false;

    // Timers
    protected animation: NodeJS.Timer | null;

    protected frameIndex: number = 0;
    protected frameList: PIXI.Texture[];
    public speed: number = 0; // y axis
    
    protected constructor(x: number, y: number, towards: Towards) {
        super();

        this.x = x;
        this.y = y;
        this.towards = towards;
    }

    /**
     * Set the state of player to walking
     */
    public walk(towards: Towards): void {
        this.isWalking = true;
        this.towards = towards;
        this.playAnimation(EntityAnimation.WALKING);
    }

    public stopWalking(): void {
        this.isWalking = false;
    }

    public abstract playAnimation(animation: EntityAnimation): void;

    protected registerAnimationTimer() {
        this.animation = setInterval(() => {
            this.texture = this.frameList[this.frameIndex];

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

    public get towards(): Towards {
        return this._towards;
    }

    public set towards(value: Towards) {
        if(
            (value === Towards.LEFT && this._towards === undefined) ||
            (value === Towards.LEFT && this._towards === Towards.RIGHT)
        ) {
            // reverse
            this.anchor.x = 1;
            this.scale.x *= -1;
        } else if(value === Towards.RIGHT && this._towards === Towards.LEFT) {
            // revert
            this.anchor.x = 0;
            this.scale.x /= -1;
        }

        this._towards = value;
    }

    public update(delta: number) {
        // Walking
        if(this.isWalking) {
            switch(this.towards) {
                case Towards.LEFT:
                    this.x -= 3;
                    break;
                case Towards.RIGHT:
                    this.x += 3;
                    break;
            }
        }
    }
}
