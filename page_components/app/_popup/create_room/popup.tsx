import { API } from "@/libs/api/api";
import { UI_Form } from "@/page_components/form";
import { UI_Screen_Fill } from "@/page_components/screen";
import { ScreenMap, ScreenMap_2 } from "@/screen/screen";
import { Element_Controller_Response, EX_Card } from "@/types";
import { GhostFieldCore } from "ghost-field";
import { useEffect, useState } from "react";
import { Screen_Editor } from "../../_screen/editor/screen";
import { MediaType } from "@/libs/client/responsive";

import cards from "@/cards.json";
import { Plain_Button } from "@/page_components/form/input/button";
import { Popup_Toast } from "../toast/popup";


type Controller = {
    show: () => void;
    hide: () => void;
}

type Status = boolean;




type Props = {
    media: MediaType;
    imageURLs: string[];
    onCreate(roomName: string): void;
}

type ScreenIDs = "create" | "edit";

export function Popup_CreateRoom({ media, imageURLs, onCreate }: Props): Element_Controller_Response<Controller, Status> {
    const [show, setShow] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [creating, setCreating] = useState(false);
    const [customCards, setCustomCards] = useState<GhostFieldCore.GF_CardComponent<EX_Card>[]>(cards as GhostFieldCore.GF_CardComponent<EX_Card>[]);

    const [screen, setScreen] = useState<ScreenIDs>("create");



    
    
    
    

    const controller: Controller = {
        show: () => setShow(true),
        hide: () => setShow(false)
    }
    async function create() {
        if (creating) return;
        setCreating(true);
        const res = await API.API_CreateRoom({
            ...(roomName ? { id: roomName } : {}),
            data: {
                cards: customCards,
                meta: {}
            }
        })
        if (res.success && res.data?.id) {
            onCreate(res.data.id);
        } else {
        }
        //非表示にして画面を更新
        setCreating(false);
        controller.hide();
    }

    console.log("update")



    const screens: ScreenMap<ScreenIDs> = {
        "create": () =>
        <UI_Screen_Fill onClick={controller.hide}>
            <div>
                <UI_Form onClick={(e) => e.stopPropagation()}
                    action={() => {
                        create();
                    }}
                >
                    <h2>ルームを作成</h2>
                    {
                        creating ?
                        <h2>作成中...</h2> :
                        <>
                            <label>ルーム名(ID)</label>
                            <input type="text" max={36} value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                            <button type="submit">作成</button>
                            <button type="button" onClick={(ev) => {setScreen("edit"); ev.stopPropagation();}}>編集</button>
                        </>
                    }
                </UI_Form>
            </div>
        </UI_Screen_Fill>,
        "edit": () => 
        <Screen_Editor
            _onClickBackward={() => setScreen("create")}
            media={media}
            imageUrls={imageURLs}
            data={customCards}
            onUpdate={(cards) => setCustomCards(cards)}
        />
    }


    
    const element = show ? (
        <UI_Screen_Fill>
            {
                screens[screen]()
            }
        </UI_Screen_Fill>
    ) : null;


    
    return {
        element,
        controller,
        status: show
    }
}