import { MergeAttributes } from "@/libs/customAttribute";
import { GhostFieldCore } from "ghost-field";



import styles from "./index.module.css";
import { EX_Card } from "@/types";
import { UI_Card } from "../card";
import { MediaType } from "@/libs/client/responsive";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    media: MediaType;
    data: GhostFieldCore.GF_DeckMap<EX_Card> | GhostFieldCore.GF_Card<EX_Card>[] | GhostFieldCore.GF_CardComponent<EX_Card>[];
    selectedCards?: Record<GhostFieldCore.GF_Card_ID, number>;
    _onClickCard?: (card: GhostFieldCore.GF_Card_ID, isSelected: boolean) => void;
}

export function Game_UI_Deck({media, data, selectedCards={}, _onClickCard, ...props}: Props) {
    const componentMap: Map<GhostFieldCore.GF_CardComponent<EX_Card>, number> = data instanceof Map ? new Map(data.entries().map(([card, count]) => [card.component, count])) : new Map();
    if (Array.isArray(data)) {
        data.forEach(card => {
            if (card instanceof GhostFieldCore.GF_Card) {
                componentMap.set(card.component, (componentMap.get(card.component) ?? 0) + 1);
            } else {
                componentMap.set(card, (componentMap.get(card) ?? 0) + 1);
            }
        });
    }

    
    
    const cards = componentMap.entries().flatMap(([component, count]) => {
        return Array.from({ length: count }, (_, index) => {
            const isSelected = index < (selectedCards[component.id] ?? 0);
            return <UI_Card key={`${component.id}-${index}`} media={media} data={component} _selected={isSelected} onClick={() => _onClickCard?.(component.id, isSelected)} showDetail />;
        });
    }).toArray();



    return (
        <div {...MergeAttributes(props, {className: styles.container})}>
            { cards }
        </div>
    );
}