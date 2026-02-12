import { MergeAttributes } from "@/libs/customAttribute";

import styles from "./index.module.css";
import { Plain_Button } from "@/page_components/form/input/button";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    data: unknown;
}


export function Room( { data, ...props }: Props ) {
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}>
            <div className={styles.room_id}>
                Room ID: {}
            </div>
            <div className={styles.player_count}>
                プレイヤー数: {}
            </div>
        </div>
    )
}