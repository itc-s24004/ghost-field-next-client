import styles from "./screen.module.css";
import { Card_List } from "./_list";
import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { Plain_Button } from "@/page_components/form/input/button";
import { FullscreenButton } from "@/page_components/app/fullscreen";
import { GhostFieldCore } from "ghost-field";
import { useState } from "react";
import { EX_Card } from "@/types";
import { Card_Setting } from "./card_setting";
import { FloatingElement } from "@/page_components/floating";
import { UI_Card } from "@/page_components/game/card";
import { ScreenMap } from "@/screen/screen";
import { Screen_TestDraw } from "../testDraw/screen";


type Props = AppScreen & {
    imageUrls: string[];
    data: GhostFieldCore.GF_CardComponent<EX_Card>[];
    onUpdate(cards: GhostFieldCore.GF_CardComponent<EX_Card>[]): void;
}

type ScreenIds = "editor" | "test";

export function Screen_Editor({ media, data, imageUrls, onUpdate, children, ...props }: Props) {
    const [open, setOpen] = useState(true);

    const [cardIndex, setCardIndex] = useState<number>(0);
    const [cards, setCards] = useState<GhostFieldCore.GF_CardComponent<EX_Card>[]>(data);


    const [screen, setScreen] = useState<ScreenIds>("editor");


    const screens: ScreenMap<ScreenIds> = {
        test: () => <Screen_TestDraw media={media} data={cards} _onClickBackward={() => setScreen("editor")} />,
        editor: () => <Screen_Frame
            {...props}

            _top={
                <>
                    <Plain_Button size="small" onClick={() => setScreen("test")}>
                        テスト画面へ移動
                    </Plain_Button>
                    <FullscreenButton />
                    <Plain_Button size="small">
                        <label>
                            インポート

                            <input type="file" style={{display: "none"}} onChange={(ev) => {
                                const files = ev.target.files;
                                if (files && files.length > 0) {
                                    const file = files[0];
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        const result = e.target?.result;
                                        if (typeof result === "string") {
                                            try {
                                                const importedCards = JSON.parse(result) as GhostFieldCore.GF_CardComponent<EX_Card>[];
                                                setCards(importedCards);
                                            } catch (error) {
                                                console.error("Failed to import cards:", error);
                                            }
                                        }
                                    };
                                    reader.readAsText(file);
                                }
                            }} />
                        </label>
                    </Plain_Button>
                    <Plain_Button size="small" onClick={() => {
                        console.log("export");
                        const data = new Blob([JSON.stringify(cards)], { type: 'application/json' });
                        const url = window.URL.createObjectURL(data);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'cards.json';
                        a.click();
                        window.URL.revokeObjectURL(url);
                    }}>エクスポート</Plain_Button>
                </>
            }
        >


            <div className={styles.card_editor_container}>
                <Card_List media={media} data={cards} open={open} onStateChange={setOpen} selectedCardId={cards[cardIndex]?.id}
                    onSelect={(id) => {
                        const selectedCard = cards.findIndex(card => card.id === id);
                        setCardIndex(selectedCard);
                    }}
                />
                <Card_Setting media={media} open={!open} data={cards[cardIndex]} imageUrls={imageUrls}
                    onCardDataChange={(data) => {
                        const newData = [...cards];
                        newData[cardIndex] = data;
                        setCards(newData);
                        onUpdate(newData);
                    }}
                    onCreateCard={() => {
                        const newCard: GhostFieldCore.GF_CardComponent<EX_Card> = {
                            id: `${cards.length+1}` as GhostFieldCore.GF_Card_ID,
                            name: "",
                            price: 0,
                            cost: 0,
                            element: GhostFieldCore.GF_Element.Normal,
                            isMagic: false,
                            weight: 10
                        };
                        setCards([ newCard, ...cards ]);
                    }}
                    onDeleteCard={() => {
                        const newData = cards.filter((_, index) => index !== cardIndex);
                        setCards(newData);
                        onUpdate(newData);
                        setCardIndex(0);
                    }}
                />
            </div>
            {/* <FloatingElement x={100} y={100}>
                <UI_Card media={media} data={cards[cardIndex]} />
            </FloatingElement> */}


        </Screen_Frame>
    }
    
    

    return (
        screens[screen]()
    )
}