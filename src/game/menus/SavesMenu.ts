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

const listMargin = .33 * window.innerWidth;
const listItemWidth = window.innerWidth - 2 * listMargin;
const listItemHeight = 70;

export default class SavesMenu extends Menu {
    private renderer: Renderer;

    private list: List;

    /**
     * If the length of save list is too large,
     * the screen will be not able to hold so many
     * items.
     * So we need a variable to store the begin
     * index of the displayed items, and change it
     * when the user scrolls the wheel.
     */
    private displayedBeginIndex = 0; // +9

    public constructor(renderer: Renderer) {
        super();

        this.renderer = renderer;
        this.initListeners();
    }

    public init(): void {
        this.addChild(MenuBackground());

        // Page Container
        var page = PageContainer();
        this.addChild(page);

        // Title
        var title = new Label("存档列表 ("+ Save.getSaves().length +")", {
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
        
        // List
        this.list = new List({
            x: 0,
            y: 100,
            width: listItemWidth,
            height: listItemHeight * 9,
            style: {
                borderColor: 0x636363
            },
            list: []
        });
        this.list.position._x = listMargin;
        this.list.appendTo(this);

        // List Items
        this.refreshSaveList();
    }

    private initListeners(): void {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape" && this.renderer.currentMenu === MenuType.SAVES) {
                this.renderer.setMenu(MenuType.MAIN);
            }
        });

        document.addEventListener("wheel", Utils.throttle((e) => {
            if(e.deltaY > 0 && this.displayedBeginIndex < Save.getSaves().length - 9) this.displayedBeginIndex += 9;
            if(e.deltaY < 0 && this.displayedBeginIndex > 0) this.displayedBeginIndex -= 9;

            this.refreshSaveList();
        }, 200));
    }

    private refreshSaveList(): void {
        var saveList = Save.getSaves();

        this.list.clearItem();
        for(let i = 0; i < saveList.length; i++) {
            if(i < this.displayedBeginIndex || i >= this.displayedBeginIndex + 9) continue;

            var item = new ListItem({
                x: 0,
                y: 100,
                width: listItemWidth,
                height: listItemHeight,
                text: "存档 - "+ saveList[i].id,
                details: Utils.timeToString(saveList[i].time),
                style: CommonButtonStyle,
                onClick: () => {
                    var save = new Save(saveList[i]);
                    // Launch the game with the specified save
                    this.renderer.setMenu(MenuType.INGAME, new Game(this.renderer, save));
                }
            });
            item.position._y = (i - this.displayedBeginIndex) * (listItemHeight + 2);
            this.list.addItem(item);
        }
    }

    public update(): void {
        
    }
}
