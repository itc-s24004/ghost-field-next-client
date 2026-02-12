type Props = React.HTMLAttributes<HTMLDivElement> & {
    x: number | string;
    y: number | string;
    mouseEvent?: boolean;
}

export function FloatingElement({ x, y, mouseEvent=false, ...props }: Props) {
    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                pointerEvents: mouseEvent ? "auto" : "none",
            }}
            {...props}
        />
    )
}