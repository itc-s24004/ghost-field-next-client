export type ScreenMap<screenId extends string> = {
    [key in screenId]: () => React.ReactNode;
}


export type ScreenMap_2<screenId extends string> = {
    [key in screenId]: React.ReactNode;
}


export type ScreenSelectorCallback<screenId extends string> = (screenId: screenId) => void;