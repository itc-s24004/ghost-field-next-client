import { MediaClassName, MediaType } from "@/libs/client/responsive"
import { MergeAttributes } from "@/libs/customAttribute";
import styles from "./index.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    media: MediaType;

}

export function TabMenu({ media, ...props }: Props) {
    return (
        <div {...MergeAttributes(props, {
            className: MediaClassName(media, {
                desktop: styles.tabMenu,
                mobile: `${styles.tabMenu} ${styles.mobile}`
            })
        })}>

        </div>
    )
}


type TabItemProps = React.HTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
}

export function TabItem({ selected, ...props }: TabItemProps) {
    return (
        <button {...MergeAttributes(props, {
            className: selected ? `${styles.tabItem} ${styles.selected}` : styles.tabItem
        })} />
    )
}



type TabItemData<data> = {
    title: string;
    disabled?: boolean;
    value?: data;
}

type GenTabMenuProps<data> = React.HTMLAttributes<HTMLDivElement> & {
    media: MediaType;
    tabs: TabItemData<data>[];
    selectedIndex: number;
    _onSelect?: ( value: data | number ) => void;
}


export function Gen_TabMenu<data>({ media, tabs, selectedIndex, _onSelect, ...props }: GenTabMenuProps<data>) {
    return (
        <TabMenu media={media} {...props}>
            {
                tabs.map(( tab, index ) => (
                    <TabItem key={index} selected={index === selectedIndex} onClick={() => {
                        if ( !tab.disabled && _onSelect ) {
                            _onSelect(tab.value ?? index);
                        }
                    }}>
                        {tab.title}
                    </TabItem>
                ))
            }
        </TabMenu>
    )
}