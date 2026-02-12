import { MergeAttributes } from "@/libs/customAttribute";
import { EX_Card } from "@/types";
import { GhostFieldCore } from "ghost-field";



import styles from "./index.module.css"
import { ElementText } from "../element";
import { ElementContainer } from "../element/container";




type Props = React.HTMLAttributes<HTMLDivElement> & {
    data: GhostFieldCore.GF_CardComponent<EX_Card> | undefined;
};

export function Card_Detail({ data, ...props }: Props) {
    if (!data) return <></>;
    
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}>
            <h2>{data.name}</h2>
            <ElementText element={data.element} />
            {/* <ElementContainer element={data.element}>
            </ElementContainer> */}
            {data.isMagic ? <p>魔法カード</p> : <></>}
            <p>発動コスト: {data.cost}</p>
            <p>価格: {data.price}</p>
            <AttackComponent component={data.offensive} />
            <DefensiveComponent component={data.defensive} />
            <TrapComponent component={data.trap} />
            <p>排出量: {data.weight}</p>
        </div>
    )
}


type AttackProps = {
    component: GhostFieldCore.GF_OffensiveComponent | undefined;
    head?: string;
}

function AttackComponent({ component, head }: AttackProps) {
    if (!component) return <></>;

    switch (component.type) {
        case "attack":
            const singleAttack = component.rate >= 1;
            if (singleAttack) {
                return <p>{head}攻撃: {component.multiUse ? "+" : ""}{component.value} (単体)</p>
            } else {
                return <p>{head}攻撃: {component.value} (全体: {Math.floor(component.rate * 100)} %)</p>
            }

        case "heal":
            return <p>{head}回復: {component.value}</p>
        
        case "exchange":
            return <p>{head}両替: HP MP Gold を等価交換できます</p>

        case "sell":
            return <p>{head}売却: アイテムを売却して Gold を得ます</p>


        default:
            return <></>
    }
}


type DefensiveProps = {
    component: GhostFieldCore.GF_DefensiveComponent | undefined;
}


function DefensiveComponent({ component }: DefensiveProps) {
    if (!component) return <></>;


    switch (component.type) {
        case "defense":
            return <p>防御: {component.multiUse ? "+" : ""}{component.value}</p>
    }
}



function TrapComponent({ component }: { component: GhostFieldCore.GF_TrapComponent | undefined }) {
    if (!component) return <></>;

    switch (component.type) {
        case "attack":
            return <AttackComponent head="トラップ: " component={component} />

        case "revive":
            return (
                <p>復活: HP {component.hp} MP {component.mp} Gold {component.gold}</p>
            )

        default:
            return <></>
    }
}