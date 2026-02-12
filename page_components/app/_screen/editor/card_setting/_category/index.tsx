"use client";

import { MergeAttributes, MergeClassNames } from "@/libs/customAttribute"
import styles from "./index.module.css"
import { MediaClassName, MediaType } from "@/libs/client/responsive"
import { useState } from "react"
import { Plain_Button } from "@/page_components/form/input/button";

type Props = React.HTMLAttributes<HTMLDivElement> & {

}

export type EX_Props = {
    media: MediaType;
    top?: React.ReactNode;
}

export function CardSetting_Category({media, top, children, ...props}: Props & EX_Props) {
    const [open, setOpen] = useState<boolean>(true);


    return (
        <div {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.container,
                MediaClassName(media, {
                    tablet: styles.mobile
                }),
                !open ? styles.close : ""
            )
        })}>
            <div className={styles.top}>
                {top}
                <Plain_Button size="small" className={styles.openButton} onClick={() => setOpen(!open)}>
                    {open ? "閉じる▲" : "開く▼"}
                </Plain_Button>
            </div>

            <div className={MergeClassNames(
                styles.content,
                open ? styles.open : styles.close
            )}>
                {children}
            </div>
        </div>
    )
}