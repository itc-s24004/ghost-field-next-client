import { MergeAttributes } from "@/libs/customAttribute";
import styles from "./index.module.css";
import { SizeType } from "@/types";


type Props = React.HTMLAttributes<HTMLElement> & {
    size?: SizeType;
};

const classNameMap: Record<SizeType, string> = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
    mega: styles.mega
};


export function PlainTitle({ size = "medium", ...props }: Props) {
    return (
        <h1 {...MergeAttributes(props, { className: `${styles.title} ${classNameMap[size]}` })} />
    )
}