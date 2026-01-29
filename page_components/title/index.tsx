import { MergeAttributes } from "@/libs/customAttribute";
import styles from "./index.module.css";



export function PlainTitle(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <h1 {...MergeAttributes(props, { className: styles.title })} />
    )
}