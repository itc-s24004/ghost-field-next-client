import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { GhostField_Client } from "ghost-field";
import { useEffect, useState } from "react";
import { Control_APP_Loading } from "../../controll_loading";
import { ScreenMap_2 } from "@/screen/screen";
import { Screen_Game_Lobby } from "../game-lobby/screen";
import { EX_Card, EX_Meta } from "@/types";
import { Screen_Game_Play } from "../game-play/screen";

type Props = AppScreen & {
    serverURL: URL;
}

type ScreenIds = "lobby" | "play";

export function Screen_Game({media, serverURL, ...props}: Props) {
    const { element: loadingElement, controller: loadingController, status } = Control_APP_Loading({children: "ゲームに接続しています..."});
    
    const [update, setUpdate] = useState(0);
    
    const [client] = useState(new GhostField_Client<EX_Card, EX_Meta>());


    const disconnect = () => {
        client.disconnect();
        props._onClickBackward?.();
    }

    


    const screen: ScreenIds = client.isPlaying ? "play" : "lobby";

    const Screens: ScreenMap_2<ScreenIds> = {
        lobby: <Screen_Game_Lobby media={media} client={client} _backwardLabel="退出" _onClickBackward={disconnect}/>,
        play: <Screen_Game_Play media={media} client={client} _backwardLabel="退出" _onClickBackward={disconnect}/>,
    }


    useEffect(() => {
        client.on("screen:manager", "connect", () => {
            loadingController.hide(true);

        }).on("screen:manager", "disconnect", () => {
            disconnect();

        }).watch("screen:manager", ["connect", "disconnect", "server:init", "server:start", "server:end"], () => {
            setUpdate(prev => prev + 1);

        }).watch("screen:manager", ["all"], (ev) => {
            console.log("イベントが届きました", ev);
            setUpdate(prev => prev + 1);
            
        });
        
        
        client.connect(serverURL)
    }, []);


    
    return (
        <>
            {loadingElement}
            {Screens[screen]}
        </>
    )
}