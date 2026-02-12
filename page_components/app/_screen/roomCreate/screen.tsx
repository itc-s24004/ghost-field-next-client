import { AppScreen, Screen_Frame } from "@/screen/screen_frame";

type Props = AppScreen & {
    _onCreate(): void;
};

export function Screen_RoomCreate({ media, _onCreate, ...props }: Props) {
    return (
        <Screen_Frame
            {...props}
        >

            <div>
                Room Create Screen
            </div>

        </Screen_Frame>
    )
}