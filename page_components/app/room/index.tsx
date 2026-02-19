import { MergeAttributes } from "@/libs/customAttribute";

import styles from "./index.module.css";
import { Plain_Button } from "@/page_components/form/input/button";
import { API } from "@/libs/api/api";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    data: API.RoomData;
}


export function Room( { data, ...props }: Props ) {
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}>
            <div className={styles.room_id}>
                Room ID: {data.id}
            </div>
            <div className={styles.player_count}>
                プレイヤー数: {data.connection}
            </div>
        </div>
    )
}