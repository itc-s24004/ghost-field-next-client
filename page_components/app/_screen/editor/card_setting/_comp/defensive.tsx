import { Gen_Select } from "@/page_components/form/select";
import { Gen_SelectGameValue } from "@/page_components/form/selectGameValue";
import { GhostFieldCore } from "ghost-field";

type Props = {
    component: GhostFieldCore.GF_DefensiveComponent | undefined;
    _onChange: ( component: GhostFieldCore.GF_DefensiveComponent ) => void;
}

export function Component_Defensive({ component, _onChange }: Props) {
    const type = component?.type;
    if (!type) {
        return <></>;

    } else if (type === "defense") {
        return (
            <>
                <label>
                    防御力:
                    <Gen_SelectGameValue
                        _value={component.value}
                        _onChange={(value) => {
                            const newComponent = { ...component, value };
                            _onChange(newComponent);
                        }}
                    />
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

    } else {
        return <></>;

    }
}