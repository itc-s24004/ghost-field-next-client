import { MergeAttributes } from "@/libs/customAttribute";
import styles from "./index.module.css";
import { Plain_Button } from "@/page_components/form/input/button";

export type Screen_Frame_Top_Props = React.HTMLAttributes<HTMLDivElement> & {
    backwardLabel?: string;
    backward?: () => void;
};

export function Screen_Frame_Top( { backwardLabel, backward, children, ...props }: Screen_Frame_Top_Props) {
    return (
        <div {...MergeAttributes(props, {
            className: styles.top
        })}>
            {backward && <Plain_Button size="small" onClick={backward}>{backwardLabel ?? "戻る"}</Plain_Button>}

            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}