import Menu from "./Menu";
import Game from "../Game";

export default class InGameMenu extends Menu {
    private game: Game;

    public constructor() {
        super();
    }

    public init(game: Game): void {
        this.game = game;

        // Game GUI
        /** @todo */
    }

    public update(delta: number): void {
        this.game.update(delta, this);
    }
}
