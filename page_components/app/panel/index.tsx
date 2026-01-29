import styles from "./index.module.css"

type PanelProps = {
    customAttribute?: React.HTMLAttributes<HTMLDivElement>;
    children?: React.ReactNode;
}


export function Panel({ customAttribute, children }: PanelProps) {
    return (
        <div {...customAttribute} className={styles.panel}>
            {children}
        </div>
    )
}