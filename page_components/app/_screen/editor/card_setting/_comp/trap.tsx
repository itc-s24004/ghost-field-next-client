import { Gen_Select } from "@/page_components/form/select";
import { GhostFieldCore } from "ghost-field";
import { Component_Offensive } from "./offensive";
import { Gen_SelectGameValue } from "@/page_components/form/selectGameValue";

type Props = {
    component: GhostFieldCore.GF_TrapComponent | undefined;
    _onChange: ( component: GhostFieldCore.GF_TrapComponent ) => void;
}

export function Component_Trap({ component, _onChange }: Props) {
    const type = component?.type;
    if (!type) {
        return <></>;

    } else if (type === "attack") {
        return <Component_Offensive
            component={component}
            _onChange={(offensive) => {
                if (offensive.type !== "attack") return;
                _onChange(offensive);
            }}
        />;

    } else if (type === "revive") {
        const { hp, mp, gold } = component;
        return (
            <>
                <label>
                    復活後のHP:
                    <Gen_SelectGameValue
                        _value={hp}
                        _onChange={(value) => {
                            const newComponent = { ...component, hp: value };
                            _onChange(newComponent);
                        }}
                    />
                </label>
                <label>
                    復活後のMP:
                    <Gen_SelectGameValue
                        _value={mp}
                        _onChange={(value) => {
                            const newComponent = { ...component, mp: value };
                            _onChange(newComponent);
                        }}
                    />
                </label>
                <label>
                    復活後のGold:
                    <Gen_SelectGameValue
                        _value={gold}
                        _onChange={(value) => {
                            const newComponent = { ...component, gold: value };
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