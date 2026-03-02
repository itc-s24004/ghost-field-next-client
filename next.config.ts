import type { NextConfig } from "next";
import path from "path";
import { API_SERVER_URL } from "./libs/api/base";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const vblob_id = process.env.BLOB_READ_WRITE_TOKEN?.split("_")[3].toLowerCase();


const nextConfig: NextConfig = {
    turbopack: {//!!! 開発用パッケージのディレクトリを含むように指定
        root: path.join(__dirname, "../")
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `knq2stxhcdd03qgq.public.blob.vercel-storage.com`,
                port: '',
                pathname: '/**',
            },
            ...((
                vblob_id ? [
                    {
                        protocol: 'https',
                        hostname: `${vblob_id}.public.blob.vercel-storage.com`,
                        port: '',
                        pathname: '/**',
                    }
                ] : []
            ) as RemotePattern[])
        ],
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
            },
            {// 外部のゲームサーバーと通信するためのCORS設定 
                source: "/",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: API_SERVER_URL.toString(),
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
            },
        ]
    }
};

export default nextConfig;
