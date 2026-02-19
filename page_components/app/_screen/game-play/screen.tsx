import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { EX_Card, EX_Meta } from "@/types";
import { GhostField_Client, GhostFieldCore } from "ghost-field";

import styles from "./screen.module.css";
import { Game_PlayerList } from "../../player_list";
import { Spacer } from "../../../spacer";
import { Plain_Button } from "@/page_components/form/input/button";
import { Game_UI_Deck } from "@/page_components/game/deck";
import { useEffect, useState } from "react";


type Props = AppScreen & {
    client: GhostField_Client<EX_Card, EX_Meta>;
}

export function Screen_Game_Play({media, client, ...props}: Props) {
    const [update, setUpdate] = useState(0);


    const [targetPlayerIndex, setTargetPlayerIndex] = useState<number>(client.state?.bind ?? 0);
    const [useOption] = useState<GhostFieldCore.GF_CardUseOptions>({hp: 0, mp: 0, gold: 0});
    const [selectedCards] = useState<GhostFieldCore.GF_Card_ID[]>([]);
    const selectedCardMap = Object.fromEntries(GhostFieldCore.GF_Util.cardArray_to_cardIDMap(selectedCards).entries());
    
    const cardIDmap = client.deck?.masterDeck.getCardMapByCardIDMap(selectedCardMap);

    useEffect(() => {
        client.watch("screen:game_play", ["server:drawCard", "server:useCard"], (name) => {
            console.log(`サーバーから${name}イベントが届きました`);
            selectedCards.splice(0, selectedCards.length);
            setUpdate(prev => prev + 1);

        });
    }, []);


    function emitUseCard() {
        if (client.canUseCard(selectedCards)) {
            client.useCard(selectedCards, targetPlayerIndex, useOption);
            
        } else {
            alert("カードが使用できません");
        }
    }

    
    function addUseCard(cardId: GhostFieldCore.GF_Card_ID) {
        const cards = [...selectedCards, cardId];
        if (client.canUseCard(cards)) {
            selectedCards.push(cardId);
        } else {
            alert("そのカードは使用できません");
        }
    }


    return (
        <Screen_Frame {...props}
            _top={"ゲームプレイ"}
        >
            <div className={styles.container}>
                <Spacer/>
                <div className={styles.screen}>
                    
                    <div className={styles.field_container}>
                        <div className={styles.field}>
                            <div className={styles.market}>
                                <Plain_Button size="medium">ブラックマーケット</Plain_Button>
                            </div>
                            <Spacer/>
                            <div className={ client.isMyTurn ? client.field ? styles.self_field : styles.self_attack_field : styles.enemy_field}>
                                <div>
                                    <h2>防御{client.field ? client.isMyTurn  ? "（あなたのターン）" : "（相手のターン）" : ""}</h2>
                                    <div className={styles.deck_container}
                                        onClick={() => {
                                            if (client.field && client.isMyTurn) emitUseCard();
                                        }}
                                    >
                                        <Game_UI_Deck media={media} data={client.isMyTurn && client.field ? cardIDmap ?? [] : []}/>
                                    </div>
                                </div>
                                <Spacer flex={0.5}/>
                                <div>
                                    <h2>攻撃{!client.field ? client.isMyTurn ? "（あなたのターン）" : "（相手のターン）" : ""}</h2>
                                    <div className={styles.deck_container}
                                        onClick={() => {
                                            if (!client.field && client.isMyTurn) emitUseCard();
                                        }}
                                    >
                                        <Game_UI_Deck media={media} data={client.isMyTurn && !client.field ? cardIDmap ?? [] : client.field?.cards ?? []}/>
                                    </div>
                                </div>
                            </div>
                            <Spacer/>
                        </div>
                        <div className={styles.players}>
                            <Game_PlayerList _client={client} _flexType="column" _showStatus={true} style={{alignItems: "center", "justifyContent": "center"}}
                                _selectedPlayerId={client.sockets[targetPlayerIndex]?.socketId}
                                _onClickPlayer={(player) => {
                                    if (player.bind !== -1) setTargetPlayerIndex(player.bind);
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.card_container}>
                        <div className={styles.deck_container}>
                            <Game_UI_Deck media={media} data={client.hand} selectedCards={selectedCardMap} _onClickCard={(card, selected) => {
                                if (selected) {
                                    selectedCards.splice(selectedCards.indexOf(card), 1);
                                } else {
                                    addUseCard(card);
                                }
                                setUpdate(prev => prev + 1);
                            }}/>
                        </div>
                        <div className={styles.deck_container}>
                            <Game_UI_Deck media={media} data={client.magicStack}/>
                        </div>
                    </div>

                </div>
                <Spacer/>
            </div>
        </Screen_Frame>
    );
}