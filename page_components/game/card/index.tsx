import { MediaType } from "@/libs/client/responsive";
import Image from "next/image";

import styles from "./index.module.css"
import { GhostFieldCore } from "ghost-field";

import { MergeAttributes, MergeClassNames } from "@/libs/customAttribute";
import { EX_Card } from "@/types";
import { Card_Offensive } from "./offensive";
import { Card_Defensive } from "./defensive";
import { useState } from "react";
import { Card_Detail } from "../card_detail";
import { FloatingElement } from "@/page_components/floating";
import { ElementContainer } from "../element/container";

type Options = React.HTMLAttributes<HTMLDivElement> & {
    media: MediaType;
    data?: GhostFieldCore.GF_CardComponent<EX_Card>;

    showDetail?: boolean;

    _selected?: boolean;
    _disabled?: boolean;
};


export function UI_Card({media, data, showDetail=false, _selected, _disabled, ...props}: Options) {
    const [show, setShow] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    

    return (
        <ElementContainer element={data?.element ?? GhostFieldCore.GF_Element.Normal} _container={true} {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.card,
                _selected ? styles.selected : "",
                _disabled ? styles.disabled : ""
            ),
            onMouseOver(ev) {
                setX(ev.clientX);
                setY(ev.clientY);
                setShow(true);
            },
            onMouseMove(ev) {
                setX(ev.clientX);
                setY(ev.clientY);
            },
            onMouseOut() {
                setShow(false);
            },
            onTouchStart(ev) {
                setX(ev.touches[0].clientX);
                setY(ev.touches[0].clientY);
                setShow(true);
            },
            onTouchEnd() {
                setShow(false);
            }

        })}>
            <div className={styles.card_imageContainer}>
                <Image src={ data?.exData?.iconUrl ?? "/card.png"} width={200} height={200} alt="" className={styles.card_image}/>
            </div>
            <div className={styles.card_status}>
                <div className={MergeClassNames(
                    styles.card_description,
                    // styles[data.element]
                )}>
                    <Card_Defensive component={data?.defensive}/>
                    <Card_Offensive component={data?.offensive}/>
                </div>
            </div>


            {
                showDetail && show &&
                <FloatingElement x={x+10} y={y+10}>
                    <Card_Detail data={data}/>
                </FloatingElement>
            }
        </ElementContainer>
    )
}