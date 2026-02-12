"use client";

import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { useEffect, useState } from "react";
import { GhostField_Client } from "ghost-field";


type Props = AppScreen & {
    serverUrl: string;
    onReady(): void;
}


export function Screen_Play({ media, serverUrl, onReady, _onClickBackward, ...props }: Props) {
    const [messages, setMessages] = useState<string[]>([]);
    
    const [client] = useState<GhostField_Client>(
        new GhostField_Client({
            "server:init"(ev) {
                onReady();
                console.log(ev.players);
            },
            "server:message"(ev) {
                console.log(ev.message);
                setMessages( prev => [...prev, ev.message] );
            }
        })
    );
    
    useEffect(() => {
        client.connect(new URL(serverUrl));

    }, [ client ]);
    
    
    const [inputMessage, setInputMessage] = useState<string>("");

    
    return (
        <Screen_Frame
            {...props}

            _backwardLabel="退出"
            _onClickBackward={() => {
                client.disconnect();
                _onClickBackward?.();
            }}


            _bottom={
                <>
                    <form action={(ev) =>  {
                        client.sendMessage(inputMessage);
                        setInputMessage("");
                    }}>
                        <input type="text" name="message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                        <button type="submit">Send</button>
                    </form>
                </>
            }
        >


            <div>
                <h2>Play Screen</h2>
                <div>
                    <h3>Messages:</h3>
                    <ul>
                        {messages.map( (msg, index) => <li key={index}>{msg}</li> )}
                    </ul>
                </div>
            </div>

            
        </Screen_Frame>
    )
}