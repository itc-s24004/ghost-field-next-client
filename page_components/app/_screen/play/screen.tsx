import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { GhostField_Client } from "ghost-field";
import { useEffect, useState } from "react";
import { Controll_APP_Loading } from "../../controll_loading";

import styles from "./screen.module.css";



type Props = AppScreen & {
    serverUrl: string;
};


export function Screen_Play({ media, serverUrl, _onClickBackward, ...props }: Props) {
    const { element, controller: { show, hide }} = Controll_APP_Loading({})
    
    
    const [client] = useState(new GhostField_Client({
        "server:init"(data) {
            hide(true);
        }
    }));


    useEffect(() => {
        client.connect(new URL(serverUrl));
    }, [])
    
    
    return (
        <>
            <Screen_Frame
                {...props}
                _backwardLabel="退出"
                _onClickBackward={() => {
                    client.disconnect();
                    _onClickBackward?.();
                }}
            >
                <div className={styles.container}>

                </div>
            </Screen_Frame>
            {
                element
            }
        </>
    )
}