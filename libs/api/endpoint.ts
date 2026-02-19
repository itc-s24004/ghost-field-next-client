import { GhostFieldCore } from "ghost-field";
import { API_Request } from "./base";
import { EX_Card, EX_Meta } from "@/types";


export type RoomData = {
    id: string;
    connection: number;
}


export const API_RoomList = () => API_Request<undefined, undefined, RoomData[], RoomData[]>({
    method: "GET",
    path: "/room"
});

export const API_RoomDetail = (roomId: string) => API_Request<undefined, undefined, GhostFieldCore.GF_Initial_Game<EX_Card, EX_Meta>, GhostFieldCore.GF_Initial_Game<EX_Card, EX_Meta>>({
    method: "GET",
    path:`/room/${roomId}`
});



export type CreateRoomRequestBody = {
    id?: string;
    data: GhostFieldCore.GF_Initial_Game<EX_Card, EX_Meta>;
}

export type CreateRoomResponse = {
    id: string;
}

export const API_CreateRoom = (body: CreateRoomRequestBody) => API_Request<CreateRoomRequestBody, CreateRoomRequestBody, CreateRoomResponse, CreateRoomResponse>({
    method: "POST",
    path: "/room",
    body
});