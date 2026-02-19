import * as vblob from "@vercel/blob"
import GF_Images from "@/GF_Images.json";

import { Screen } from "./screen";

export default async function Page() {

    // const blobResult = await vblob.list();
    // const GF_Images = blobResult.blobs.map(blob => blob.downloadUrl);
    // console.log(GF_Images.length);

    
    return <Screen publicImages={GF_Images}/>
}