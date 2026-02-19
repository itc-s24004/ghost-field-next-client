import { GhostFieldCore } from "ghost-field"
import { JSX } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    component: GhostFieldCore.GF_OffensiveComponent | undefined;
}

export function Card_Offensive({ component, ...props }: Props): JSX.Element {
    if (!component) return <></>;


    switch (component.type) {
        case "attack":
            return (
                <div {...props}>
                    攻: {component.value}
                </div>
            )
        case "heal":
            return (
                <div {...props}>
                    {component.healType}+{component.value}
                </div>
            )
        case "exchange":
        case "sell":
            return <></>
    }
}