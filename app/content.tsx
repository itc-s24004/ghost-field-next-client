// "use client";

import { PlainTitle } from "@/page_components/title";


export async function PageContent() {
    const test = await fetch("https://ghost-field-server.onrender.com/ghost-field/info", {method: "OPTIONS"})
    return (
        <div>
            <PlainTitle>Ghost Field Next Client</PlainTitle>
            <div>
                {test.status}
                <div>
                    {JSON.stringify(await test.json())}
                </div>
            </div>
        </div>
    )
}
