import * as vblob from "@vercel/blob"
import GF_Images from "@/GF_Images.json";

import { Game_Screen } from "./_screen/screen";

export default async function Page() {

    // const blobResult = await vblob.list();
    // const GF_Images = blobResult.blobs.map(blob => blob.downloadUrl);
    // console.log(GF_Images.length);

    
    return <Game_Screen publicImages={GF_Images}/>
}