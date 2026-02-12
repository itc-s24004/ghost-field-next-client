import { MergeAttributes } from "@/libs/customAttribute";
import styles from "./index.module.css";
import { UI_Card } from "@/page_components/game/card";
import { MediaType } from "@/libs/client/responsive";
import { GhostFieldCore } from "ghost-field";
import { EX_Card } from "@/types";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    media: MediaType;
    data: GhostFieldCore.GF_CardComponent<EX_Card>[];
};

export function Card_List({ media, data, ...props }: Props) {
    return (
        <div {...MergeAttributes(props, { className: styles.card_list })}>
            {
                data.map((item, index) => (
                    <UI_Card key={index} media={media} data={item} />
                ))
            }
        </div>
    )
}