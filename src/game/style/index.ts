import { TextStyle } from "pixijs";
import type { ButtonStyle } from "../../types";

export const gameFont = "Minecraft AE";

export const CommonButtonStyle: ButtonStyle = {
    backgroundColor: 0x333333,
    borderColor: 0x636363,
    hoverBackgroundColor: 0x222222,
    hoverBorderColor: 0x43c91a
};

export const ButtonTextStyle = new TextStyle({
    fill: 0xeeeeee,
    fontSize: 20,
    fontFamily: gameFont,
});

export const AboutItemTextStyle = new TextStyle({
    fill: 0xffffff,
    fontSize: 16,
    fontFamily: gameFont
});
