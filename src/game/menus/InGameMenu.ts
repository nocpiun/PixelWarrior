import Menu from "./Menu";
import Game from "../Game";

export default class InGameMenu extends Menu {
    private game: Game;

    public constructor() {
        super();
    }

    public init(game: Game): void {
        this.game = game;
    }

    public update(): void {
        
    }
}
