import { Gen_Select } from "@/page_components/form/select";
import { Gen_SelectGameValue } from "@/page_components/form/selectGameValue";
import { GhostFieldCore } from "ghost-field";

type Props = {
    component: GhostFieldCore.GF_OffensiveComponent | undefined;
    _onChange: ( component: GhostFieldCore.GF_OffensiveComponent ) => void;
}

export function Component_Offensive({ component, _onChange }: Props) {
    const type = component?.type;
    if (!type) {
        return <></>;

    } else if (type === "exchange") {
        return (
            <></>
        );

    } else if (type === "sell") {
        return (
            <></>
        );

    } else if (type === "attack") {
        return (
            <>
                <label>
                    攻撃力:
                    <Gen_SelectGameValue
                        _value={component.value}
                        _onChange={(value) => {
                            const newComponent = { ...component, value };
                            _onChange(newComponent);
                        }}
                    />
                </label>
                <label>
                    命中率:{(component.rate * 100).toFixed().padStart(3, " ")}%<br/>
                    <input type="range" value={component.rate * 100} min={0} max={100} onChange={(e) => {
                        const rate = e.target.valueAsNumber / 100;
                        const newComponent = { ...component, rate };
                        _onChange(newComponent);
                    }} />
                </label>
                <label>
                    追加使用:
                    <input type="checkbox" checked={component.multiUse} onChange={(e) => {
                        const multiUse = e.target.checked;
                        const newComponent = { ...component, multiUse };
                        _onChange(newComponent);
                    }} />
                </label>
            </>
        );

    } else if (type === "heal") {
        return (
            <>
                <label>
                    回復タイプ:
                    <Gen_Select<GhostFieldCore.GF_PlayerStatusType>
                        options={[
                            { value: "hp", label: "HP回復" },
                            { value: "mp", label: "MP回復" },
                            { value: "gold", label: "Gold回復" },
                        ]}
                        value={component.healType}
                        _onChange={(value) => {
                            const newComponent = { ...component, healType: value };
                            _onChange(newComponent);
                        }}
                    />
                </label>
                <label>
                    回復量:
                    <Gen_SelectGameValue
                        _value={component.value}
                        _onChange={(value) => {
                            const newComponent = { ...component, value };
                            _onChange(newComponent);
                        }}
                    />
                </label>
            </>
        );

    } else {
        return <></>;

    }
}