import { UI_Form } from "@/page_components/form";
import { UI_Screen_Fill } from "@/page_components/screen";
import { Element_Controller_Response, GhostField_Client_Type } from "@/types";
import { useEffect, useState } from "react";

type Controller = {
    show: () => void;
    hide: () => void;
}

type Status = boolean;


type Props = {
    _client: GhostField_Client_Type;
}

export function Popup_ChangeName({ _client }: Props): Element_Controller_Response<Controller, Status> {
    const [update, setUpdate] = useState(0);

    const [show, setShow] = useState(false);
    const [name, setName] = useState(_client.state?.name ?? "");

    useEffect(() => {
        _client.on("popup:change_name", "server:setName", (data) => {
            if (data.socketId === _client.socketID) setName(data.newName);
            
        }).watch("popup:change_name", ["server:playerListChange"], () => {
            setUpdate(prev => prev + 1);

        });
    })
    
    
    
    const element = show ? (
        <UI_Screen_Fill onClick={() => controller.hide()}>
            <div>
                <UI_Form
                    action={() => {
                        _client.changeName(name);
                        controller.hide();
                    }}
                    onClick={(e) => {e.stopPropagation();}}
                >
                    <h2>名前を変更</h2>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoFocus/>
                </UI_Form>
            </div>
        </UI_Screen_Fill>
    ) : null;


    const controller: Controller = {
        show: () => setShow(true),
        hide: () => setShow(false)
    }
    
    

    return {
        element,
        controller,
        status: show
    };
}