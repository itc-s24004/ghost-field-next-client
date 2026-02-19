import { Plain_Button } from "@/page_components/form/input/button";
import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { EX_Card } from "@/types";
import { GhostFieldCore } from "ghost-field";
import { JSX, useEffect, useState } from "react";


import styles from "./screen.module.css";
import { UI_Card } from "@/page_components/game/card";
import { Game_UI_Deck } from "@/page_components/game/deck";
import { Animation_Control_Card } from "../../control/animation/animation_control_card";
import { Animation_Control_Card_Single } from "../../control/animation/animation_control_card copy";



type Props = AppScreen & {
    data: GhostFieldCore.GF_CardComponent<EX_Card>[];
}

export function Screen_TestDraw({ media, data, ...props }: Props) {
    const [cards, setCards] = useState<GhostFieldCore.GF_CardComponent<EX_Card>[]>([]);

    const [drawnCards, setDrawnCards] = useState<GhostFieldCore.GF_CardComponent<EX_Card>[]>([]);


    const { element, controller: { playAnimation, stopAnimation }, status: { playing } } = Animation_Control_Card({ media });

    const [drawingCards, setDrawingCards] = useState<JSX.Element[]>([]);


    // useEffect(() => {
    //     console.log("run effect")
    //     if (!playing) {
    //         console.log(playing)
    //         const drawCard = drawnCards.shift();
    //         if (!drawCard) return;
    //         playAnimation("draw").then(() => {
    //             stopAnimation();
    //             setDrawnCards([...drawnCards]);
    //             setCards([drawCard, ...cards]);

    //         });

    //     }

    // }, [drawnCards, playing, playAnimation, cards]);

    
    try {
        const [deck] = useState(new GhostFieldCore.GF_Deck(data));
        
        return (
            <Screen_Frame
                {...props}
            >
                <div className={styles.container}>
                    <div>
                        <Plain_Button onClick={async () => {
                            const animationElement = <Animation_Control_Card_Single media={media} animationId="draw" key={drawingCards.length}/>;
                            setDrawingCards((prev) => [...prev, animationElement]);
                        }}>ドロー</Plain_Button>
                    </div>
                    <Game_UI_Deck media={media} data={cards} />
                </div>
                {
                    drawingCards
                }
                {
                    drawingCards.length
                }
            </Screen_Frame>
        )

    } catch (error) {
        return (
            <Screen_Frame
                {...props}
            >
                <p>カードの読み込みに失敗しました。</p>
                <code>
                    {
                        error instanceof GhostFieldCore.GF_Error ? `エラーコード: ${error.message}` : ""
                    }
                </code>
            </Screen_Frame>
        )
    }
}