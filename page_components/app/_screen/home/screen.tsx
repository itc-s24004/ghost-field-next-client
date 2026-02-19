import { MergeAttributes } from "@/libs/customAttribute";
import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { Plain_Button } from "@/page_components/form/input/button";
import { PlainTitle } from "@/page_components/title"
import { SizeType } from "@/types";

import styles from "./screen.module.css";
import { Popup_CreateRoom } from "../../_popup/create_room/popup";
import { ScreenMap_2 } from "@/screen/screen";
import { Screen_Game } from "../game/screen";
import { useState } from "react";
import { API_SERVER_URL } from "@/libs/api/base";





type ScreenIDs = "home" | "game";

type SelectType = "create" | "join";

type Props = AppScreen & {
    imageURLs: string[];
    select(type: SelectType): void;
};



export function Screen_Home({ media, imageURLs, select, ...props }: Props) {
    const size: SizeType = media === "mobile" ? "large" : "mega";


    const {element: createRoomElement, controller: createRoomController} = Popup_CreateRoom({
        media,
        imageURLs,
        onCreate: (roomName) =>  {
            setServerURL(new URL(`/${roomName}`, API_SERVER_URL));
            setScreen("game");
        }
    })
    
    
    const [serverURL, setServerURL] = useState<URL | null>(null);
    
    const [screen, setScreen] = useState<ScreenIDs>("home");

    const screens: ScreenMap_2<ScreenIDs> = {
        "home":
        <Screen_Frame
        >
            {createRoomElement}
            <div {...MergeAttributes(props, { className: styles.container })}>
                <PlainTitle size={size}>Ghost Field</PlainTitle>
                <Plain_Button size={size} onClick={createRoomController.show}>ルームを作成</Plain_Button>
                <Plain_Button size={size} onClick={() => select("join")}>ルームに参加</Plain_Button>
            </div>


        </Screen_Frame>,
        "game":
        <Screen_Game
            media={media}
            serverURL={serverURL!}
            _onClickBackward={() => setScreen("home")}
        />
    }
    
    
    
    return (
        screens[screen]
    )
}