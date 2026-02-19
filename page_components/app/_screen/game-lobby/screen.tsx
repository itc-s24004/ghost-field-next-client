import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { EX_Card, EX_Meta } from "@/types";
import { GhostField_Client } from "ghost-field";

import styles from "./screen.module.css";
import { PlainTitle } from "@/page_components/title";
import { Game_Chat } from "../../chat";
import { Game_PlayerList } from "../../player_list";
import { Popup_ChangeName } from "../../_popup/change_name";
import { Plain_Button } from "@/page_components/form/input/button";
import { useEffect, useState } from "react";



type Props = AppScreen & {
    client: GhostField_Client<EX_Card, EX_Meta>;
}


export function Screen_Game_Lobby({media, client, ...props}: Props) {
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        client.watch("screen:lobby", ["server:playerListChange"], () => {
            setUpdate(prev => prev + 1);
        });
    }, [])
    const { isOwner = false } = client.state ?? {}



    return (
        <Screen_Frame
            {...props}
            _top={
                <PlainTitle size="medium">ゲームロビー</PlainTitle>
            }
        >
            <div className={styles.container}>
                <div className={styles.left}>
                    <Game_PlayerList className={styles.playerList} _client={client} _showStatus={false} _selectedPlayerId={client.socketID} />
                    {
                        isOwner &&
                        <div className={styles.ownerControls}>
                            <Plain_Button size="medium" onClick={() =>{
                                client.startGame();
                            }}>ゲーム開始</Plain_Button>
                        </div>
                    }
                </div>
                <div className={styles.chat}>
                    <Game_Chat _client={client}/>
                </div>
            </div>
        </Screen_Frame>
    );
}