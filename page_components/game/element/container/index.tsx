import { MergeAttributes, MergeClassNames } from "@/libs/customAttribute";
import { GhostFieldCore } from "ghost-field";

import styles from "./index.module.css";


type ElementContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    element: GhostFieldCore.GF_Element;
    _container?: boolean;
    _text?: boolean;
}


export function ElementContainer({element, _container=false, _text=true, ...props }: ElementContainerProps) {
    return (
        <div
            {...MergeAttributes(props, {
                className: GetElementColor(element, {container: _container, text: _text})
            })}
        />
    )
}


type GetElementColorOptions = {
    container?: boolean;
    text?: boolean;
}

export function GetElementColor(element: GhostFieldCore.GF_Element, options: GetElementColorOptions = {}) {
    const { container=false, text=true } = options;

    return MergeClassNames(
        styles[element],
        container ? styles.container : "",
        text ? styles.text : ""
    )
}