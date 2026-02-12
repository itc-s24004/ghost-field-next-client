import { MergeAttributes, MergeClassNames } from "@/libs/customAttribute";
import { GhostFieldCore } from "ghost-field"

import styles from "./index.module.css"

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
    element: GhostFieldCore.GF_Element;
}

export function ElementText({ element, ...props }: Props) {
    return (
        <p {...MergeAttributes(props, {
            className: styles.container
        })}>
            <Element_to_Text element={element}/>
        </p>
    )
}


type ElementTextProps = {
    element: GhostFieldCore.GF_Element
}

export function Element_to_Text({ element }: ElementTextProps) {
    switch (element) {
        case GhostFieldCore.GF_Element.Normal: return "無属性";
        case GhostFieldCore.GF_Element.Fire: return "火属性";
        case GhostFieldCore.GF_Element.Wind: return "風属性";
        case GhostFieldCore.GF_Element.Water: return "水属性";
        case GhostFieldCore.GF_Element.Stone: return "石属性";
        case GhostFieldCore.GF_Element.Dark: return "闇属性";
        case GhostFieldCore.GF_Element.Light: return "光属性";
        case GhostFieldCore.GF_Element.Lightning: return "雷属性";
        case GhostFieldCore.GF_Element.Wood: return "木属性";

        case GhostFieldCore.GF_Element.Empty: return "無-特殊属性"
    }
}





