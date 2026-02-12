import * as vblob from "@vercel/blob"


import { Dev_Screen } from "./_screen/screen";

import GF_Images from "@/GF_Images.json";

export default async function Page() {
    // const blobResult = await vblob.list();
    // const GF_Images = blobResult.blobs.map(blob => blob.downloadUrl);
    // console.log(GF_Images.length);

    
    return <Dev_Screen imageUrls={GF_Images} />;
}