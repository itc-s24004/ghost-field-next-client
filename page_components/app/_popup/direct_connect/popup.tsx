import { API_SERVER_URL } from "@/libs/api/base";
import { UI_Form } from "@/page_components/form";
import { UI_Screen_Fill } from "@/page_components/screen";
import { Element_Controller_Response } from "@/types";
import { useState } from "react";

type Controller = {
    show: () => void;
    hide: () => void;
}




type Props = {
    onConnect(serverURL: URL): void;
}

export function Popup_Direct_Connect({ onConnect }: Props): Element_Controller_Response<Controller, boolean> {
    const [show, setShow] = useState(false);
    const [serverURL, setServerURL] = useState("");

    const controller: Controller = {
        show: () => setShow(true),
        hide: () => setShow(false)
    }
    
    
    function connect() {
        try {
            const url = new URL(serverURL);
            onConnect(url);
        } catch (e) {
            const API_URL = new URL(`/${serverURL}`, API_SERVER_URL);
            onConnect(API_URL);

        }
    }
    
    
    const element = show ? (
        <UI_Screen_Fill onClick={() => controller.hide()}>
            <div>
                <UI_Form
                    action={() => connect()}
                    onClick={(e) => {e.stopPropagation();}}
                >
                    <h2>サーバーに接続</h2>
                    <label>ルームIDまたはサーバーURL</label>
                    <input type="text" value={serverURL} onChange={(e) => setServerURL(e.target.value)} autoFocus placeholder="例: ws://example.com:5000/room"/>
                    <button type="submit">接続</button>
                </UI_Form>
            </div>
        </UI_Screen_Fill>
    ) : null;
    
    return {
        element,
        controller,
        status: show
    }
    
    
}