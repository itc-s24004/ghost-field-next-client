import { MergeAttributes, MergeClassNames } from "@/libs/customAttribute";
import { GhostFieldCore } from "ghost-field";

import styles from "./index.module.css";
import { CardSetting_Category } from "./_category";
import { MediaClassName, MediaType } from "@/libs/client/responsive";
import { useState } from "react";
import { EX_Card } from "@/types";
import { Popup_Select_Image } from "@/page_components/app/_popup/select_image/popup";
import { Plain_Button } from "@/page_components/form/input/button";
import { ElementContainer, GetElementColor } from "@/page_components/game/element/container";
import { Element_to_Text, ElementText } from "@/page_components/game/element";
import { Gen_Select } from "@/page_components/form/select";
import { Component_Offensive } from "./_comp/offensive";
import { Component_Defensive } from "./_comp/defensive";
import { Component_Trap } from "./_comp/trap";
import { Gen_SelectGameValue } from "@/page_components/form/selectGameValue";


type Props = React.HTMLAttributes<HTMLDivElement> & EX_Props;


export type EX_Props = {
    media: MediaType;
    open: boolean;
    imageUrls: string[];
    data?: GhostFieldCore.GF_CardComponent<EX_Card>;
    onCardDataChange?: (data: GhostFieldCore.GF_CardComponent<EX_Card>) => void;

    onCreateCard: () => void;
    onDeleteCard: () => void;
}

export function Card_Setting({ media, open, imageUrls, data, onCardDataChange, onCreateCard, onDeleteCard, ...props }: Props) {
    const [showSelectPopup, setShowSelectPopup] = useState(false);
    
    
    return (
        <div {...MergeAttributes(props, {
            className: MergeClassNames(styles.container,
                MediaClassName(media, {
                    tablet: styles.mobile
                }),
                !open ? styles.hidden : ""
            )
        })}>
            <CardSetting_Category media={media} top={"基本設定 / トラップ"}>
                <label>
                    名前:
                    <input type="text" value={data?.name ?? ""} onChange={(e) => {
                        const name = e.target.value;
                        if (data) onCardDataChange?.({...data, name});
                    }}/>
                </label>
                <label>
                    id: 
                    <input type="text" value={data?.id ?? ""} onChange={(e) => {
                        const id = e.target.value as GhostFieldCore.GF_Card_ID;
                        if (data) onCardDataChange?.({...data, id});
                    }}/>
                </label>
                <label>
                    属性:
                    <select value={data?.element ?? GhostFieldCore.GF_Element.Normal} onChange={(e) => {
                        const element = e.target.value as GhostFieldCore.GF_Element;
                        if (data) onCardDataChange?.({...data, element});
                    }}>
                        {
                            Object.values(GhostFieldCore.GF_Element).map((element, index) => (
                                <option value={element} key={index} className={GetElementColor(element)}>
                                    <Element_to_Text element={element}/>
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label>
                    排出量:
                    <input type="number" value={data?.weight ?? 0} onChange={(e) => {
                        const weight = Number(e.target.value);
                        if (data) onCardDataChange?.({...data, weight});
                    }}/>
                </label>
                <label>
                    価格:
                    <input type="number" value={data?.price ?? 0} onChange={(e) => {
                        const price = Number(e.target.value);
                        if (data) onCardDataChange?.({...data, price});
                    }}/>
                </label>
                <label>
                    魔法カード:
                    <input type="checkbox" checked={data?.isMagic ?? false} onChange={(e) => {
                        const isMagic = e.target.checked;
                        if (data) onCardDataChange?.({...data, isMagic});
                    }}/>
                </label>
                <label>
                    発動コスト:
                    <Gen_SelectGameValue
                        _value={data?.cost ?? 0}
                        _onChange={(cost) => {
                            if (data) onCardDataChange?.({...data, cost});
                        }}
                    />
                </label>
                <Plain_Button onClick={() => setShowSelectPopup(true)}>
                    アイコンを選択
                </Plain_Button>
                <Plain_Button onClick={onCreateCard}>カードを追加</Plain_Button>
                <Plain_Button onClick={onDeleteCard}>カードを削除</Plain_Button>
            </CardSetting_Category>
            <CardSetting_Category media={media} top={"攻撃 / 防御 / トラップ"}>
                <label>
                    攻撃タイプ:
                    <Gen_Select<GhostFieldCore.GF_OffensiveComponent["type"] | "">
                        value={data?.offensive?.type ?? ""}
                        options={[
                            { value: "", label: "なし" },
                            { value: "exchange", label: "両替"},
                            { value: "sell", label: "売却"},
                            { value: "attack", label: "攻撃"},
                            { value: "heal", label: "回復"},
                        ]}
                        _onChange={(value) => {
                            if (!data) return;

                            switch (value) {
                                case "": {
                                    const newData = {...data, offensive: undefined};
                                    onCardDataChange?.(newData);
                                    break;

                                }
                                default: {
                                    const newComponent = genOffensiveComponent(value);
                                    const newData = {...data, offensive: newComponent};
                                    onCardDataChange?.(newData);
                                    break;
                                }
                            }

                        }}
                    />
                </label>
                <Component_Offensive component={data?.offensive} _onChange={(component) => {
                    if (data) {
                        const newData = {...data, offensive: component};
                        onCardDataChange?.(newData);
                    }
                }}/>
                <label>
                    防御タイプ:
                    <Gen_Select<GhostFieldCore.GF_DefensiveComponent["type"] | "">
                        value={data?.defensive?.type ?? ""}
                        options={[
                            { value: "", label: "なし" },
                            { value: "defense", label: "防御"}
                        ]}
                        _onChange={(value) => {
                            if (!data) return;

                            switch (value) {
                                case "": {
                                    const newData = {...data, defensive: undefined};
                                    onCardDataChange?.(newData);
                                    break;

                                }
                                default: {
                                    const newComponent = genDefensiveComponent(value);
                                    const newData = {...data, defensive: newComponent};
                                    onCardDataChange?.(newData);
                                    break;
                                }
                            }

                        }}
                    />
                </label>
                <Component_Defensive component={data?.defensive} _onChange={(component) => {
                    if (data) {
                        const newData = {...data, defensive: component};
                        onCardDataChange?.(newData);
                    }
                }}/>
                <label>
                    トラップタイプ:
                    <Gen_Select<GhostFieldCore.GF_TrapComponent["type"] | "">
                        value={data?.trap?.type ?? ""}
                        options={[
                            { value: "", label: "なし" },
                            { value: "attack", label: "攻撃"},
                            { value: "revive", label: "復活"},
                        ]}
                        _onChange={(value) => {
                            if (!data) return;

                            switch (value) {
                                case "": {
                                    const newData = {...data, trap: undefined};
                                    onCardDataChange?.(newData);
                                    break;

                                }
                                default: {
                                    const newComponent = genTrapComponent(value);
                                    const newData = {...data, trap: newComponent};
                                    onCardDataChange?.(newData);
                                    break;
                                }
                            }

                        }}
                    />
                </label>
                <Component_Trap component={data?.trap} _onChange={(component) => {
                    if (data) {
                        const newData = {...data, trap: component};
                        onCardDataChange?.(newData);
                    }
                }}/>



            </CardSetting_Category>
            {
                showSelectPopup &&
                <Popup_Select_Image
                    media={media}
                    imageUrls={imageUrls}
                    canCancel={true}
                    onSelect={(url) => {
                        console.log("selected url:", url);
                        setShowSelectPopup(false);
                        if (data) {
                            const newEX: EX_Card = {...data.exData, iconUrl: url};
                            onCardDataChange?.({...data, exData: newEX});
                        }
                    }}
                />
            }
        </div>
    )
}



function genOffensiveComponent(type: GhostFieldCore.GF_OffensiveComponent["type"]) {
    switch (type) {
        case "exchange": {
            const component: GhostFieldCore.GF_CC_Exchange = {
                type
            }
            return component;
        }
        case "sell": {
            const component: GhostFieldCore.GF_CC_Sell = {
                type
            }
            return component;
        }
        case "attack": {
            const component: GhostFieldCore.GF_CC_Attack = {
                type,
                "multiUse": false,
                "rate": 1,
                "value": 0
            };
            return component;
        }
        case "heal": {
            const component: GhostFieldCore.GF_CC_Heal = {
                type,
                "healType": "hp",
                "value": 0
            };
            return component;

        }
        default:
            return undefined;
    }
}


function genDefensiveComponent(type: GhostFieldCore.GF_DefensiveComponent["type"]) {
    switch (type) {
        case "defense": {
            const component: GhostFieldCore.GF_CC_Defense = {
                type,
                multiUse: false,
                value: 0
            }
            return component;
        }
        default:
            return undefined;
    }
}


function genTrapComponent(type: GhostFieldCore.GF_TrapComponent["type"]) {
    switch (type) {
        case "attack": {
            const component: GhostFieldCore.GF_CC_Attack = {
                type,
                "multiUse": false,
                "rate": 1,
                "value": 0
            };
            return component;
        }
        case "revive": {
            const component: GhostFieldCore.GF_CC_Revive = {
                type,
                hp: 10,
                mp: "mp",
                gold: "gold"
            };
            return component;

        }
        default:
            return undefined;
    }
}