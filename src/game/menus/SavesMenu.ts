import Menu from "./Menu";
import Game from "../Game";

import Label from "../components/Label";
import List, { ListItem } from "../components/List";
import PageContainer from "../components/PageContainer";
import { MenuBackground } from "../components/Background";

import Renderer from "../Renderer";
import Save from "../Save";
import { MenuType } from "../../types";
import { gameFont, CommonButtonStyle } from "../style";
import Utils from "../../utils/Utils";

export default class SavesMenu extends Menu {
    private renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.init();
        this.initListeners();
    }

    public init(): void {
        var saves = Save.getSaves();

        this.addChild(MenuBackground());

        // Page Container
        var page = PageContainer();
        this.addChild(page);

        // Title
        var title = new Label("存档列表 ("+ saves.length +")", {
            x: 0,
            y: 50,
            style: {
                fill: 0xffffff,
                fontSize: 30,
                fontFamily: gameFont
            }
        });
        title.textObject.position._x = window.innerWidth / 2 - title.textObject.width / 2;
        title.appendTo(this);
        
        // Content
        const listMargin = .23 * page.width;
        const listItemWidth = page.width - 2 * listMargin;
        const listItemHeight = 70;
        var list = new List({
            x: 0,
            y: 100,
            width: listItemWidth,
            height: 700,
            style: {
                borderColor: 0x636363
            },
            list: []
        });
        list.position._x = window.innerWidth / 2 - page.width / 2 + listMargin;
        list.appendTo(this);
        for(let i = 0; i < saves.length; i++) {
            var item = new ListItem({
                x: 0,
                y: 100,
                width: listItemWidth,
                height: listItemHeight,
                text: "存档 - "+ saves[i].id,
                details: Utils.timeToString(saves[i].time),
                style: CommonButtonStyle,
                onClick: () => {
                    var save = new Save(saves[i]);
                    // Launch the game with the specified save
                    this.renderer.setMenu(MenuType.INGAME, new Game(this.renderer, save));
                }
            });
            item.position._y = i * (listItemHeight + 2);
            list.addItem(item);
        }
    }

    private initListeners(): void {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape" && this.renderer.currentMenu === MenuType.SAVES) {
                this.renderer.setMenu(MenuType.MAIN);
            }
        });
    }

    public update(): void {
        
    }
}
