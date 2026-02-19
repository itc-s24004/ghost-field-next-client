import { FloatingElement } from "@/page_components/floating";
import { Element_Controller_Response } from "@/types";
import { useState } from "react";


import styles from "./index.module.css";
import { UI_Card } from "@/page_components/game/card";
import { MediaType } from "@/libs/client/responsive";



type AnimationIds = "draw"

const animations: AnimationMap<AnimationIds> = {
    draw: 1000,
}





type Controller = {
    playAnimation(id: AnimationIds): Promise<void>;
    stopAnimation(): void;
}

type Status = {
    playing: boolean;
}


type Props = {
    media: MediaType;
    animationId: AnimationIds;
    onAnimationEnd?: () => void;
}

export function Animation_Control_Card_Single({ media, animationId, onAnimationEnd }: Props) {
    const [ended, setEnded] = useState(false);
    
    const element =  (
        <FloatingElement className={styles[animationId]}>
            <UI_Card
                media={media}
            />
        </FloatingElement>
    );

    setTimeout(() => {
        setEnded(true);
        onAnimationEnd?.();
    }, animations[animationId]);

    return ended ? <></> : element;
}