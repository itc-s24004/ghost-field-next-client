export type SizeType = "small" | "medium" | "large" | "extraLarge" | "mega"

export type Element_Controller_Response<Controller> = {
    element: React.ReactNode;
    controller: Controller;
}


export type EX_Card = {
    iconUrl?: string;
}

export type EX_Meta = {
    roomClient?: string;
}