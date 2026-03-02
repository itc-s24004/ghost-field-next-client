import * as vblob from "@vercel/blob";
import fs from "fs";

vblob.list().then(res => {
    const GF_Images = res.blobs.map(blob => blob.downloadUrl);
    console.log(`画像の数: ${GF_Images.length}`);
    fs.writeFileSync("GF_Images.json", JSON.stringify(GF_Images, null));
    console.log("GF_Images.jsonに画像URLを保存しました。");

}).catch(err => {
    console.error("画像の取得に失敗しました:", err);
    
});