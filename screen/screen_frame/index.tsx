import { MergeAttributes } from "@/libs/customAttribute";
import { ReactNode } from "react";


import styles from "./index.module.css";
import { Screen_Frame_Top } from "../top";
import { MediaType } from "@/libs/client/responsive";


export type AppScreen = ScreenFrameProps & {
    media: MediaType;
}


export type ScreenFrameProps = React.HTMLAttributes<HTMLDivElement> & {
    /**トップバーに表示する内容 */
    _top?: ReactNode;
    /**戻るボタンに表示するラベル */
    _backwardLabel?: string;
    /**トップバーの戻るボタンがクリックされたときの処理 */
    _onClickBackward?: () => void;

    /**ボトムバーに表示する内容 */
    _bottom?: ReactNode;

    /**自動で隠すかどうか */
    _autoHide?: boolean;
};


export function Screen_Frame({ _top, _backwardLabel, _onClickBackward, _bottom, _autoHide = true, children, ...props }: ScreenFrameProps) {
    const showTop = _autoHide ? Boolean(_top || _backwardLabel || _onClickBackward) : true;
    const showBottom = _autoHide ? Boolean(_bottom) : true;
    
    
    return (
        <div {...MergeAttributes(props, { className: styles.container })}>
            {
                showTop &&
                <div className={styles.top}>
                    <Screen_Frame_Top backwardLabel={_backwardLabel} backward={_onClickBackward}>
                        {_top}
                    </Screen_Frame_Top>
                </div>
            }

            {
                children &&
                <div className={styles.content}>
                    {children}
                </div>
            }

            {
                showBottom &&
                <div className={styles.bottom}>
                    {_bottom}
                </div>
            }
        </div>
    )
}

