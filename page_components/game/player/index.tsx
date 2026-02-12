import { MergeAttributes } from "@/libs/customAttribute";

import styles from "./index.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> &  {
    data: {
        hp: number;
        mp: number;
        gold: number;
        name: string;
    }
};

export function UI_Player({ data, ...props }: Props) {
    return (
        <div {...MergeAttributes(props, { className: styles.player })}>
            <div className={styles.player_name}>{data.name}</div>
            <div className={styles.player_status}>
                <div className={styles.player_hp}>HP: {data.hp}</div>
                <div className={styles.player_mp}>MP: {data.mp}</div>
                <div className={styles.player_gold}>Gold: {data.gold}</div>
            </div>
        </div>
    )
}