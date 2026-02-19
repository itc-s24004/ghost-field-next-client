import { GhostField_Client } from "ghost-field";

export type SizeType = "small" | "medium" | "large" | "extraLarge" | "mega"

export type Element_Controller_Response<Controller, Status = undefined> = {
    element: React.ReactNode;
    controller: Controller;
    status: Status;
}


export type EX_Card = {
    iconUrl?: string;
}

export type EX_Meta = {
    roomClient?: string;
}



export type GhostField_Client_Type = GhostField_Client<EX_Card, EX_Meta>;