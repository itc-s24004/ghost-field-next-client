import { MergeAttributes, MergeClassNames } from "@/libs/customAttribute";

import styles from "./index.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> &  {
    _showStatus: boolean;
    _data: {
        hp?: number;
        mp?: number;
        gold?: number;
        name: string;
    };
    _selected?: boolean;
    _isSelf?: boolean;
};

export function UI_Player({ _showStatus, _data, _selected, _isSelf, ...props }: Props) {
    return (
        <div {...MergeAttributes(props, {
            className: MergeClassNames(styles.container, _selected ? styles.selected : "", _showStatus ? "" : styles.center)
        })}>
            <div className={styles.player_name}>{_isSelf ? "（あなた）" : ""}{_data.name}</div>
            {
                _showStatus &&
                <div className={styles.status}>
                    <div className={styles.status_container}>
                        HP: <span>{_data.hp ?? 0}</span>
                    </div>
                    <div className={styles.status_container}>
                        MP: <span>{_data.mp ?? 0}</span>
                    </div>
                    <div className={styles.status_container}>
                        Gold: <span>{_data.gold ?? 0}</span>
                    </div>
                </div>
            }
        </div>
    )
}