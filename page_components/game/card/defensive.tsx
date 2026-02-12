import { GhostFieldCore } from "ghost-field"

type Props = React.HTMLAttributes<HTMLDivElement> & {
    component: GhostFieldCore.GF_DefensiveComponent | undefined;
}

export function Card_Defensive({ component, ...props }: Props) {
    if (!component) return <></>;


    switch (component.type) {
        case "defense":
            return (
                <div {...props}>
                    防: {component.value}
                </div>
            )
        
        default:
            return <></>
    }
}