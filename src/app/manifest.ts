import { type MetadataRoute } from "next";

const Manifest = (): MetadataRoute.Manifest => {
    return {
        background_color: "oklch(14.1% 0.005 285.823)",
        description: "SharpNote：你的 Markdown 专属写作空间。极简设计，操作直观，专注于写作本身。响应迅速，即开即用，捕捉每一个灵感瞬间。隐私安全，本地存储，所有数据全部存储于浏览器。完全开源，永久免费，开启你的写作之旅。",
        dir: "ltr",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        icons: [
            {
                purpose: "any",
                sizes: "any",
                src: "/favicon.svg",
                type: "image/svg"
            },
            {
                purpose: "any",
                sizes: "any",
                src: "/favicon-srgb.svg",
                type: "image/svg"
            },
            {
                purpose: "any",
                sizes: "16x16",
                src: "/favicon-16.png",
                type: "image/png"
            },
            {
                purpose: "any",
                sizes: "32x32",
                src: "/favicon-32.png",
                type: "image/png"
            },
            {
                purpose: "any",
                sizes: "64x64",
                src: "/favicon-64.png",
                type: "image/png"
            },
            {
                purpose: "any",
                sizes: "128x128",
                src: "/favicon-128.png",
                type: "image/png"
            },
            {
                purpose: "any",
                sizes: "256x256",
                src: "/favicon-256.png",
                type: "image/png"
            },
            {
                purpose: "any",
                sizes: "512x512",
                src: "/favicon-512.png",
                type: "image/png"
            }
        ],
        id: "/",
        lang: "zh-Hans-CN",
        launch_handler: {
            client_mode: ["focus-existing", "navigate-existing"]
        },
        name: "SharpNote",
        orientation: "any",
        scope: "/",
        short_name: "#Note",
        start_url: "/",
        theme_color: "oklch(98.5% 0 0)"
    };
};

export default Manifest;
