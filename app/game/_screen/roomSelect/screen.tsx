import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { Room } from "@/page_components/app/room";
import { Plain_Button } from "@/page_components/form/input/button";

type Props = AppScreen & {
    data: unknown;
    selectRoom: (roomId: string) => void;
    onJoin(serverUrl: string): void;
}


export function Screen_RoomSelect({ media, data, selectRoom, onJoin, children, ...props }: Props) {


    return (
        <Screen_Frame
            {...props}

            _top={
                <div style={{display: "flex", flexDirection: 'row-reverse'}}>
                    <Plain_Button size="small" style={{ }}>ダイレクト接続</Plain_Button>
                </div>
            }

        >


            <div>
                <Room data={data} onClick={() => selectRoom("roomid")}/>
            </div>

            
        </Screen_Frame>
    )
}