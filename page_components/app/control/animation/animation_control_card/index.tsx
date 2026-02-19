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
}

export function Animation_Control_Card({ media }: Props): Element_Controller_Response<Controller, Status> {
    const [currentAnimation, setAnimation] = useState<AnimationIds | null>(null);


    
    
    const element =  (
        <FloatingElement className={styles[currentAnimation ?? "none"]}>
            <UI_Card
                media={media}
            />
        </FloatingElement>
    );

    const controller: Controller = {
        async playAnimation(id: AnimationIds) {
            return new Promise((resolve) => {
                setAnimation(id);
                setTimeout(() => {
                    setAnimation(null);
                    resolve();
                }, animations[id]);
            });
        },
        stopAnimation() {
            setAnimation(null);
        }
    };

    return {
        element,
        controller,
        status: {
            playing: currentAnimation !== null
        }
    };
    
    
}