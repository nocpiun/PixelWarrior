import Entity from "../Entity";

import type { Skin, Towards } from "../../../types";

export default abstract class Player extends Entity {
    public isUsingSkill: boolean;

    public constructor(x: number, y: number, towards: Towards) {
        super(x, y, towards);
    }

    public jump(): void {
        
    }

    public abstract getSkin(): Skin;
    public abstract useSkill1(): void;
    public abstract useSkill2(): void;
}
