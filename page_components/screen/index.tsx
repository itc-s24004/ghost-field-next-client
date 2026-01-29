import { MergeAttributes } from "@/libs/customAttribute";
import styles from "./index.module.css";


export function UI_Screen_Fill(props: React.HTMLAttributes<HTMLDivElement>) {
    const { children, ...parentProps } = props;
    return (
        <div {...MergeAttributes(parentProps, {className: styles.fillScreen})}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}