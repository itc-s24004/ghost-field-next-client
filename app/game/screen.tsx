"use client";


import { API_SERVER_URL } from "@/libs/api/base";
import { useResponsiveMedia } from "@/libs/client/responsive";
import { Screen_Game } from "@/page_components/app/_screen/game/screen";
import { Screen_Home } from "@/page_components/app/_screen/home/screen";
import { Screen_RoomCreate } from "@/page_components/app/_screen/roomCreate/screen";
import { Screen_RoomSelect } from "@/page_components/app/_screen/roomSelect/screen";
import { Control_APP_Loading } from "@/page_components/app/controll_loading";
import { ScreenMap, ScreenMap_2 } from "@/screen/screen";
import { useState } from "react";

type ScreenIds = "home" | "roomCreate" | "roomSelect" | "game";

type Props = {
    publicImages: string[];
}


export function Screen({ publicImages, ...props }: Props) {
    const { element: loadingElement, controller: loadingController, status: loadingStatus } = Control_APP_Loading({})

    const media = useResponsiveMedia(() => {
        loadingController.hide(true);
    });



    const [serverURL, setServerURL] = useState<URL>(API_SERVER_URL);
    const [screen, setScreen] = useState<ScreenIds>("home");


    const Screens: ScreenMap_2<ScreenIds> = {
        "home":
        <Screen_Home
            media={media}
            imageURLs={publicImages}
            select={(type) => {
                if (type === "create") {
                    setScreen("roomCreate");
                } else if (type === "join") {
                    setScreen("roomSelect");
                }
            }}
        />,
        
        "roomCreate":
        <Screen_RoomCreate media={media} API_Server_URL={API_SERVER_URL} onCreate={() => {}} _onClickBackward={() => setScreen("home")}/>,
        
        "roomSelect":
        <Screen_RoomSelect media={media} API_Server_URL={API_SERVER_URL} connect={(server) => {setServerURL(server); setScreen("game");}} _onClickBackward={() => setScreen("home")}/>,

        "game":
        <Screen_Game media={media} serverURL={serverURL} _onClickBackward={() => setScreen("home")}/>
    }
    
    


    return (
        <>
            {loadingElement}
            {Screens[screen]}
        </>
    );

}