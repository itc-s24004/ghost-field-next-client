import { UI_Form } from "@/page_components/form";
import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { useState } from "react";

type Props = AppScreen & {
    API_Server_URL: URL;
    onCreate(): void;
};

export function Screen_RoomCreate({ media, API_Server_URL, onCreate, ...props }: Props) {
    const [roomName, setRoomName] = useState("");
    
    
    return (
        <Screen_Frame
            {...props}
        >

            <div>
                <UI_Form>
                    <label>ルーム名(ID)</label>
                    <input type="text" max={36} value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                    <button type="submit">作成</button>
                </UI_Form>
            </div>

        </Screen_Frame>
    )
}