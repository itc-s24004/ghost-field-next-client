import { Plain_Button } from "@/page_components/form/input/button";

import styles from "./index.module.css";
import { MergeAttributes } from "@/libs/customAttribute";

export function FullscreenButton(props: React.HTMLAttributes<HTMLButtonElement>) {

    return <Plain_Button {...MergeAttributes(props, { className: styles.fullscreen })} size="small" onClick={() => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }}>全画面切り替え</Plain_Button>;
}