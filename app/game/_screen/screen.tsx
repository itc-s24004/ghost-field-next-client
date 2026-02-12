"use client";

import { useEffect, useState } from "react";
import { MediaType, ResponsiveMedia } from "@/libs/client/responsive";
import { Controll_APP_Loading } from "@/page_components/app/controll_loading";
// import { Screen_Play } from "./play/play";
import { ScreenMap } from "@/screen/screen";
import { Screen_RoomSelect } from "./roomSelect/screen";
import { Screen_RoomInfo } from "./roomInfo/screen";
import { GhostFieldCore } from "ghost-field";
import { EX_Card } from "@/types";
import { Screen_Editor } from "@/page_components/app/_screen/editor/screen";
import { Screen_Home } from "@/page_components/app/_screen/home/screen";
import { Screen_Play } from "@/page_components/app/_screen/play/screen";
// import { GhostFieldCore } from "ghost-field";

// const { GameInitData } = GhostFieldCore;




export type ScreenIds = "home" | "roomCreate"| "roomSelect" | "roomInfo" | "room" | "play";

type Props = {
    serverUrl?: string;
    publicImages?: string[];
}

export function Game_Screen({ serverUrl, publicImages=[] }: Props) {
    const [media, setMedia] = useState<MediaType>("desktop");

    const [serverAddress, setServerAddress] = useState<string | undefined>(serverUrl);
    const [screen, setScreen] = useState<keyof ScreenMap<ScreenIds>>("home");

    const { element: loadingElement, controller: { show, hide }} = Controll_APP_Loading({})

    useEffect(() => {
        ResponsiveMedia(undefined, "width", (media) => {
            setMedia(media);
            hide(true);

        }, (media) => {
            setMedia(media);

        });
    }, []);


    const [roomList, setRoomList] = useState<unknown[]>([]);


    
    async function navigateScreen(screenId: ScreenIds) {
        if (screenId === "roomSelect") {
            show();
            
            //!!! 未実装 ルームリストの取得
            const rooms = await new Promise<unknown[]>( resolve => setTimeout(() => resolve([]), 1000) );
            setRoomList(rooms);
            setScreen("roomSelect");
            hide(true);
        } else {
            setScreen(screenId);
        }
    }

    
    const [roomInfo, setRoomInfo] = useState<unknown>(null);
    async function navigateRoomInfo(roomId: string) {
        show();

        //!!! 未実装 ルーム詳細情報の取得
        const info = await new Promise( resolve => setTimeout(resolve, 1000) );

        setRoomInfo(info);
        setScreen("roomInfo");
        hide(true);
    }


    
    const Screens: ScreenMap<ScreenIds> = {
        home: () => <Screen_Home media={media} onCreateRoom={() => setScreen("roomCreate")} onJoinRoom={() => navigateScreen("roomSelect")} />,
        roomCreate: () => <Screen_Editor imageUrls={publicImages} data={GhostFieldCore.GameInitData.cards as GhostFieldCore.GF_CardComponent<EX_Card>[]} media={media} _onClickBackward={() => setScreen("home")}
            onUpdate={(data) => {
                
            }}
        />,

        roomSelect: () => <Screen_RoomSelect media={media} _onClickBackward={() => setScreen("home")}
            data={undefined} selectRoom={navigateRoomInfo}
            onJoin={(serverUrl) => {
                setServerAddress(serverUrl);
                setScreen("play");
            }}
        />,
        roomInfo: () => <Screen_RoomInfo media={media} _onClickBackward={() => setScreen("roomSelect")}
            data={roomInfo}
            onJoin={(serverUrl) => {
                setServerAddress(serverUrl);
                setScreen("play");
            }}
        />,

        room: () => <div>Room Screen</div>,
        play: () => <Screen_Play media={media} _onClickBackward={() => setScreen("home")} serverUrl={serverAddress ?? "ws://localhost:5000/test"}
        
        />,
    };


    return (
        <>
            {loadingElement}
            {Screens[screen]()}
        </>
    )
}

