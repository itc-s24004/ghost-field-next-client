import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { Room } from "@/page_components/app/room";
import { Plain_Button } from "@/page_components/form/input/button";
import { useEffect, useState } from "react";
import { API } from "@/libs/api/api";
import { Popup_Direct_Connect } from "../../_popup/direct_connect/popup";

import styles from "./screen.module.css";


type Props = AppScreen & {
    API_Server_URL: URL;
    connect: (server: URL) => void;
}


export function Screen_RoomSelect({ media, API_Server_URL, connect, children, ...props }: Props) {
    const [rooms, setRooms] = useState<API.RoomData[]>([]);

    const { element: popupElement, controller: popupController } = Popup_Direct_Connect({
        onConnect: (serverURL) => connect(serverURL)
    });
    
    
    useEffect(() => {
        API.API_RoomList().then(res => {
            if (res.success) {
                setRooms(res.data ?? []);
            }
        });
    }, []);


    return (
        <Screen_Frame
            {...props}

            _top={
                <div style={{display: "flex", flexDirection: 'row-reverse'}}>
                    <Plain_Button size="small" style={{ }} onClick={() => popupController.show()}>サーバーに接続</Plain_Button>
                </div>
            }

        >
            {popupElement}

            <div className={styles.container}>
                {
                    rooms.map(room => (
                        <Room key={room.id} data={room} onClick={() => connect(new URL(`/${room.id}`, API_Server_URL))}/>
                    ))
                }
            </div>

            
        </Screen_Frame>
    )
}