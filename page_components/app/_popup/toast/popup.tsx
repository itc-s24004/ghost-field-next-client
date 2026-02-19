import { MergeAttributes } from "@/libs/customAttribute";

import styles from "./popup.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> & {

}

export function Popup_Toast({...props}: Props) {
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}/>
    );
}