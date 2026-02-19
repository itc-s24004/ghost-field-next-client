"use client";

import { MediaClassName, MediaType } from "@/libs/client/responsive";
import styles from "./index.module.css"
import { useState } from "react";
import { UI_Card } from "@/page_components/game/card";
import { Gen_TabMenu } from "@/page_components/tab";
import type { GhostFieldCore } from "ghost-field";
import { EX_Card } from "@/types";




type Props = {
    media: MediaType;
    data: GhostFieldCore.GF_CardComponent<EX_Card>[];
    onSelect?: ( id: GhostFieldCore.GF_Card_ID ) => void;
    open: boolean;
    onStateChange?: ( open: boolean ) => void;

    selectedCardId?: GhostFieldCore.GF_Card_ID;
}

export function Card_List({ media, data, onSelect, open, onStateChange, selectedCardId }: Props) {
    const [ filter, setFilter ] = useState<number>(0);


    const filteredData = data.filter((card) => {
        switch (filter) {
            case 0:
                return true;
            case 1:
                return card.offensive !== undefined;
            case 2:
                return card.defensive !== undefined;
            case 3:
                return card.offensive?.type === "heal";
            case 4:
                return card.trap !== undefined;
            default:
                return true;
        }
    });
    
    
    
    
    
    return (
        <div className={MediaClassName(media, {
            desktop: styles.container,
            tablet: `${styles.container} ${styles.mobile} ${!open ? styles.hidden : ""}`,
        })}>
            <Gen_TabMenu media={media} className={styles.filter} tabs={[
                { title: "すべて", value: 0 },
                { title: "攻撃", value: 1 },
                { title: "防御", value: 2 },
                { title: "回復", value: 3 },
                { title: "トラップ", value: 4 },
            ]} selectedIndex={filter} _onSelect={(data) => {
                setFilter(data);
            }} />

            <div style={{display: "flex", overflow: "hidden", flex: 1}}>
                <div className={styles.list}>
                    {
                        filteredData.map((card, index) => (
                            <UI_Card key={index} media={media} data={card} showDetail={true} _selected={selectedCardId === card.id}
                                onClick={() => {
                                    onSelect?.(card.id);
                                }}
                            />
                        ))
                    }
                </div>
                <div className={styles.switch} onClick={() => {
                    onStateChange?.(!open);
                }}>
                    {
                        open ? "閉じる" : "カード一覧を開く"
                    }
                </div>
            </div>
        </div>
    )
}