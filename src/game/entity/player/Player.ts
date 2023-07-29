import Entity from "../Entity";

import { g } from "../../../global";
import type { Skin, Towards } from "../../../types";
import Utils from "../../../utils/Utils";

const maxJumpingHeight = 240;

export default abstract class Player extends Entity {
    public isUsingSkill: boolean = false;
    
    public isJumping: boolean = false;
    private jumpingHeight: number = 0;

    public constructor(x: number, y: number, towards: Towards) {
        super(x, y, towards);
    }

    public jump(): void {
        this.isJumping = true;
        this.speed = Math.sqrt(2 * g * maxJumpingHeight);
    }

    public abstract getSkin(): Skin;
    public abstract useSkill1(): void;
    public abstract useSkill2(): void;

    public update(delta: number): void {
        super.update(delta);

        // Gravity
        var collision = Utils.containInScreen(this);
        if(
            !this.isJumping &&
            (
                !collision ||
                (collision && !collision.has("bottom"))
            )
        ) {
            this.speed += g * delta;

            const dy = this.speed * delta + g * Math.pow(delta, 2) / 2;

            // To prevent the player sprite being "stuck" in the ground
            this.y + dy > window.innerHeight - this.height
            ? this.y = window.innerHeight - this.height
            : this.y += dy;
        }

        // Jumping
        if(this.isJumping) {
            this.speed -= g * delta;

            const dy = this.speed * delta + g * Math.pow(delta, 2) / 2;
            this.y -= dy;
            this.jumpingHeight += dy;

            if(this.speed <= 0) {
                this.isJumping = false;
                this.jumpingHeight = 0;
                this.speed = 0;
            }
        }
    }
}
