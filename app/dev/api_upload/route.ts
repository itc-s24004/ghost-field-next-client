import * as vblob from "@vercel/blob";


export async function PUT(req: Request) {
    const from = await req.formData();

    const file = from.get("file");

    if (!(file instanceof Blob)) {
        return new Response("No file", { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
        return new Response("Invalid file type", { status: 400 });
    }

    const vresult = await vblob.put(crypto.randomUUID(), file, {
        access: "public",
        contentType: file.type
    });

    return new Response("OK");
    
}