import { GhostFieldCore } from "ghost-field";
import { Gen_Select, GenSelectProps } from "../select";

type Props = {
    _value?: GhostFieldCore.GF_GameValue;
    _onChange?: (value: GhostFieldCore.GF_GameValue) => void;
}

export function Gen_SelectGameValue({ _value="hp", _onChange }: Props) {
    return (
        <>
            <Gen_Select<GhostFieldCore.GF_GameValue>
                options={[
                    { value: "hp", label: "自身のHP" },
                    { value: "mp", label: "自身のMP" },
                    { value: "gold", label: "所持ゴールド" },
                    { value: typeof _value === "number" ? _value : 1, label: "指定値"}
                ]}
                value={_value}
                _onChange={(value) => {
                    _onChange?.(value);
                }}
            />
            {
                typeof _value === "number" &&
                <input type="number" value={_value} onChange={(ev) => {
                    const newValue = parseInt(ev.target.value);
                    if (!isNaN(newValue) && newValue >= 0) {
                        _onChange?.(newValue);
                    }
                }} />
            }
        </>
    );
}