import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    headers() {
        return [
            {// 外部のWebSocketサーバーと通信するためのCORS設定 
                source: "/",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*"
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
