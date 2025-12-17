"use client";

import { useEffect, useState } from "react";


import styles from "./page.module.css";
import { GhostFieldClient } from "ghost-field";

enum ConnectionState {
    Disconnected = "Disconnected",
    Connecting = "Connecting",
    Connected = "Connected",
    ConnectError = "ConnectError",
}


export function PageContent() {
    const [origin, setOrigin] = useState<URL | null>(null);

    const [connection, setConnection] = useState<ConnectionState>(ConnectionState.Disconnected);


    const [client] = useState(new GhostFieldClient());

    const canConnect = origin && connection !== ConnectionState.Connected && connection !== ConnectionState.Connecting;


    const [messages, setMessages] = useState<string[]>([]);
    
    const [inputMessage, setInputMessage] = useState<string>("");

    useEffect(() => {
        client.on("connect", () => {
            setConnection(ConnectionState.Connected);

        }).on("connect_error", ()  => {
            setConnection(ConnectionState.ConnectError);
            
        }).on("disconnect",()  => {
            setConnection(ConnectionState.Disconnected);

        }).on("global:message", (msg: string) => {
            setMessages((prev) => [ ...prev, msg ]);
        });

    }, [ client ]);
    
    return (
        <div>
            <h1>Test Page</h1>
            <input type="text" className={styles.inputField} onChange={(ev) => {
                try {
                    const url = new URL(ev.target.value);
                    setOrigin(url.origin !== "null" ? url : null);

                } catch {
                    setOrigin(null);

                }
            }} />
            <input type="button" value="接続" className={styles.connectButton} disabled={!canConnect}
                onClick={async () => {
                    if (canConnect) {
                        console.log(origin)
                        const serverInfo = await GhostFieldClient.getServerInfo(origin);
                        if (!serverInfo) return setConnection(ConnectionState.ConnectError);
                        // if (serverInfo.supported_client.some(c => c.id ===  GhostFieldClient.id)) return setConnection(ConnectionState.ConnectError);
                        console.log(serverInfo)
                        setConnection(ConnectionState.Connecting);
                        client.connect(origin);
                    }
                }}
            />
            <input type="button" value="切断" className={styles.connectButton} disabled={connection !== ConnectionState.Connected}
                onClick={() => {
                    if (connection === ConnectionState.Connected) {
                        client.disconnect();
                    }
                }}
            />

            <h1 className={styles.status}>{connection}</h1>
            <form action="#" onSubmit={(ev) => {
                ev.preventDefault();
            }}>
                <input type="text" className={styles.inputField} value={inputMessage} onChange={(ev) => {
                    setInputMessage(ev.target.value);
                }} />
                <input type="submit" value="送信" className={styles.sendButton} onClick={() => {
                    client.sendGlobalMessage(inputMessage);
                    setInputMessage("");
                }} />
            </form>
            <div>
                {
                    messages.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))
                }
            </div>
        </div>
    )
}
