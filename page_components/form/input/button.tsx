import { MergeAttributes } from "@/libs/customAttribute";
import styles from "./button.module.css";
import { SizeType } from "@/types";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: SizeType;
};


const SizeClssMap: Record<SizeType, string> = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
    mega: styles.mega
};


export function Plain_Button({size = "medium", ...props}: Props) {
    return (
        <button {...MergeAttributes(props, {
            className: `${styles.button} ${SizeClssMap[size]}`
        })}/>
    )
}