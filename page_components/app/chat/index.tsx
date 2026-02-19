import { EX_Card, EX_Meta } from "@/types"
import { GhostField_Client } from "ghost-field"

import styles from "./index.module.css";
import { MergeAttributes } from "@/libs/customAttribute";
import { useEffect, useState } from "react";
import { Popup_ChangeName } from "../_popup/change_name";
import { UI_Form } from "@/page_components/form";


type Props = React.HTMLAttributes<HTMLDivElement> & {
    _client: GhostField_Client<EX_Card, EX_Meta>;
}

export function Game_Chat({_client, ...props}: Props) {
    const [update, setUpdate] = useState(0);
    useEffect(() => {
        _client.watch("components:chat", ["server:message", "server:setName", "server:playerListChange"], () => {
            setUpdate(prev => prev + 1);
        });
    }, []);
    

    const { sockets, messages } = _client;

    function getPlayerName(playerId: string) {
        const player = sockets.find(p => p.socketId === playerId);
        return player ? player.name : "Unknown";
    }







    const { element: changeNamePopup, controller: changeNameController } = Popup_ChangeName({ _client });




    const [messageInput, setMessageInput] = useState("");
    const sendMessage = () => {
        if (messageInput.trim() === "") return;
        _client.sendMessage(messageInput);
        setMessageInput("");
    }
    
    
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}>
            <div className={styles.header}>
                <div className={styles.title}>チャット</div>

            </div>
            <div className={styles.message_container}>
                {
                    messages.map((message, index) => (
                        <div key={index} className={styles.message}>
                            <div className={styles.message_sender}>{getPlayerName(message.from)}</div>
                            <div className={styles.message_content}>{message.message}</div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.form_container}>
                <UI_Form action={sendMessage}>
                    <div className={styles.input_container}>
                        <input type="text" className={styles.input} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="メッセージを入力..." />
                        <button>送信</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            changeNameController.show();
                        }}>名前を変更</button>
                    </div>
                </UI_Form>
            </div>

            {changeNamePopup}
        </div>
    );
}