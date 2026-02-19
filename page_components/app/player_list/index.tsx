import { UI_Player } from "@/page_components/game/player";
import { EX_Card, EX_Meta } from "@/types";
import { GhostField_Client, socketData } from "ghost-field";

import styles from "./index.module.css";
import { MergeAttributes, MergeClassNames } from "@/libs/customAttribute";
import { useEffect, useState } from "react";


type FlexType = "column_wrap" | "column" | "row_wrap" | "row" | "none";

type Props = React.HTMLAttributes<HTMLDivElement> &  {
    _client: GhostField_Client<EX_Card, EX_Meta>;
    _showStatus: boolean;
    _selectedPlayerId?: string;
    _flexType?: FlexType;
    _onClickPlayer?: (player: socketData) => void;
}

export function Game_PlayerList({ _client, _showStatus=false, _selectedPlayerId, _flexType="none", _onClickPlayer, ...props }: Props) {
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        _client.watch("components:player_list", ["server:playerListChange", "server:setName"], () => {
            setUpdate(prev => prev + 1);
        });
    }, [])
    
    
    const { sockets, isPlaying } = _client;

    return (
        <div {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.container,
                styles[_flexType]
            )
        })}>
            {
                sockets.map((player, index) => {
                    const data = _client.getGamePlayerStatus(player.bind);
                    return isPlaying && player.bind === -1 ? null :
                    <UI_Player key={index} _data={{...data, name: player.name}} _showStatus={_showStatus} _isSelf={player.socketId === _client.state?.socketId} _selected={player.socketId === _selectedPlayerId} onClick={() => _onClickPlayer?.(player)}/>
                })
            }
        </div>
    );
}