type Props = React.HTMLAttributes<HTMLDivElement> & {
    flex?: number;
}

export function Spacer({ flex=1, ...props }: Props) {
    return <div {...props} style={{ flex }} />;
}