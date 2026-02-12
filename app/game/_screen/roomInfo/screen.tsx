import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { Plain_Button } from "@/page_components/form/input/button";

type Props = AppScreen & {
    data: unknown;
    onJoin: (serverUrl: string) => void;
};

export function Screen_RoomInfo({ media, data, onJoin, ...props }: Props) {
    return (
        <Screen_Frame
            {...props}

            _top={
                <>
                    <Plain_Button size="small" onClick={() => onJoin("ws://localhost:5000/test")}>参加</Plain_Button>
                </>
            }
        
        >


            <div>
                Room Info Screen
            </div>


        </Screen_Frame>
    )
}