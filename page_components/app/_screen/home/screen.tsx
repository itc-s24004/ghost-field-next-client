import { MergeAttributes } from "@/libs/customAttribute";
import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { Plain_Button } from "@/page_components/form/input/button";
import { PlainTitle } from "@/page_components/title"
import { SizeType } from "@/types";

import styles from "./screen.module.css";



type Props = AppScreen & {
    onCreateRoom: () => void;
    onJoinRoom: () => void;
};



export function Screen_Home({ media, onCreateRoom, onJoinRoom, ...props }: Props) {
    const size: SizeType = media === "mobile" ? "large" : "mega";
    return (
        <Screen_Frame
        >


            <div {...MergeAttributes(props, { className: styles.container })}>
                <PlainTitle size={size}>Ghost Field</PlainTitle>
                <Plain_Button size={size} onClick={onCreateRoom}>ルームを作成</Plain_Button>
                <Plain_Button size={size} onClick={onJoinRoom}>ルームに参加</Plain_Button>
            </div>


        </Screen_Frame>
    )
}