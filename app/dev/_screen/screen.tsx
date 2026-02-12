"use client";

import { useEffect, useState } from "react";
import { Dev_Screen_Upload } from "./upload/screen";
import { MediaType, ResponsiveMedia } from "@/libs/client/responsive";
import { Screen_Editor } from "@/page_components/app/_screen/editor/screen";




export type ScreenIds = "editor" | "upload";


type Props = {
    imageUrls: string[];
}

export function Dev_Screen({ imageUrls }: Props) {
    const [media, setMedia] = useState<MediaType>("desktop");
    const [screen, setScreen] = useState<ScreenIds>("upload");
    
    useEffect(() => {
        ResponsiveMedia(undefined, "width", setMedia, setMedia);
    }, [])


    const Screens: Record<ScreenIds, () => React.ReactNode> = {
        editor: () => <Screen_Editor media={media} imageUrls={imageUrls} data={[]} onUpdate={() => {}} _onClickBackward={() => setScreen("upload")} />,
        upload: () => <Dev_Screen_Upload media={media} _backwardLabel="エディタへ移動" _onClickBackward={() => setScreen("editor")} />,
    };


    return (
        Screens[screen]()
    )
}