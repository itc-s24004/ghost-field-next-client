import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    turbopack: {//!!! 開発用パッケージのディレクトリを含むように指定
        root: path.join(__dirname, "../")
    },

    headers() {
        return [
            {// 外部のゲームサーバーと通信するためのCORS設定 
                source: "/",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "https://ghost-field-server.onrender.com/",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,POST"
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type"
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
