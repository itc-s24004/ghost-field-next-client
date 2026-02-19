import { AppScreen, Screen_Frame } from "@/screen/screen_frame";
import { UI_Card } from "@/page_components/game/card";
import { GhostFieldCore } from "ghost-field";
import { useState } from "react";
import { Tool_Img_Cut } from "@/page_components/app/_tool/img_cut/tool";


import styles from "./screen.module.css";
import { api_upload } from "../../api_upload/client";

type Props = AppScreen & {};

export function Dev_Screen_Upload({ media, ...props}: Props) {
    const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);


    const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

    
    const [imgCutResult, setImgCutResult] = useState<Blob | undefined>(undefined);
    const [cardImg, setCardImg] = useState<string | undefined>(undefined);
    
    
    return (
        <Screen_Frame
            {...props}
        >


            
            <div className={styles.container}>

                <div className={styles.preview}>
                    <UI_Card
                        media={media}
                        data={
                            {
                                id: "sample-card" as GhostFieldCore.GF_Card_ID,
                                name: "サンプルカード",                            
                                element: GhostFieldCore.GF_Element.Normal,
                                cost: 1,
                                price: 0,
                                "isMagic": false,
                                "weight": 1,
                                "exData": {
                                    "iconUrl": cardImg
                                }
                            }
                        }
                    />


                    <form className={styles.form} action={() => {
                        if (!imgCutResult) {
                            alert("画像が切り取られていません");
                            return;
                        }
                        const file = new File([imgCutResult], "card.png", { type: "image/png" });
                        api_upload(file).then((url) => {
                            alert("アップロード成功: " + url);
                        }).catch((error) => {
                            console.error("アップロード失敗", error);
                            alert("アップロード失敗");
                        });
                    }}>


                        <label className={styles.formLabel}>
                            画像を選択
                            <input type="file" name="file" id="file-input" accept="image/*" style={{display: "none"}} onChange={(ev) => {
                                const files = ev.target.files;
                                if (files && files.length > 0) {
                                    const file = files[0];
                                    setImgUrl(URL.createObjectURL(file));
                                } else {
                                    setImgUrl(undefined);
                                }
                            }}/>
                        </label>



                        <label className={styles.formLabel}>
                            <button type="submit">Upload</button>
                        </label>

                    </form>

                    <div>
                        <h2>使い方</h2>
                        <p>ドラッグ: 画像の切り取る座標を移動</p>
                        <p>Ctrl + ドラッグ: 画像の切り取るサイズを変更</p>
                        <p>Alt + ドラッグ: 画像の切り取り座標とサイズを整数に丸める</p>
                    </div>
                </div>
                




                <img src={imgUrl} alt="" ref={setImgRef} className={styles.img} />

                {
                    imgRef &&
                    <Tool_Img_Cut
                        img={imgRef}
                        size={
                            {
                                width:  150,
                                height: 150
                            }
                        }
                        onResult={(blob) => {
                            const url = URL.createObjectURL(blob);
                            setImgCutResult(blob);
                            setCardImg(url);
                        }}
                    />
                }
            </div>


        </Screen_Frame>
    )
}