import { MergeAttributes } from "@/libs/customAttribute";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function UI_Player(props: Props) {
    return (
        <div {...MergeAttributes(props, {})}>
            名前 | HP | MP | Gold | 状態異常 / アイコン | ゴーストアイコン
        </div>
    )
}