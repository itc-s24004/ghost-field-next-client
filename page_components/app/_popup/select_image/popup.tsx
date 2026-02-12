import { UI_Screen_Fill } from "@/page_components/screen";
import Image from "next/image";
import styles from "./popup.module.css";
import { MediaClassName, MediaType } from "@/libs/client/responsive";
import { MergeClassNames } from "@/libs/customAttribute";

type Porps<cancel extends boolean = false> = {
    media: MediaType;
    imageUrls: string[];
    canCancel: cancel;
    onSelect: (url: cancel extends true ? string | undefined : string) => void;
};

export function Popup_Select_Image<cancel extends boolean = false>({ media, imageUrls, canCancel, onSelect }: Porps<cancel>) {
    return (
        <UI_Screen_Fill className={styles.root} onClick={() => {
            if (canCancel) onSelect(undefined as cancel extends true ? string | undefined : string)
        }}>
            <div className={MergeClassNames(
                styles.container,
                MediaClassName(media, {
                    tablet: styles.tablet,
                    mobile: styles.mobile,
                })
            )}>
                {
                    imageUrls.map( (url, index) => (
                        <Image key={index} src={url} alt={`Image ${index}`} width={200} height={200} className={styles.image} onClick={(e) => {
                            e.stopPropagation();
                            onSelect(url as cancel extends true ? string | undefined : string);
                        }}/>
                    ))
                }
            </div>
        </UI_Screen_Fill>
    )
}

