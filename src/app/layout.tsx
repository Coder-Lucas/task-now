import Footer from "#/footer.tsx";
import Header from "#/header.tsx";
import "@styles/main.css";
import { type Metadata, type Viewport } from "next";
import Script from "next/script";

type TRootLayoutProps = {
    readonly children: React.ReactNode;
};

const metadata: Metadata = {
    authors: {
        name: "Lucas",
        url: "https://github.com/Coder-Lucas"
    },
    appleWebApp: {
        capable: true,
        title: "SharpNote"
    },
    applicationName: "SharpNote",
    category: "笔记应用",
    classification: "在线 Markdown 笔记应用",
    description: "SharpNote：你的 Markdown 专属写作空间。极简设计，操作直观，专注于写作本身。响应迅速，即开即用，捕捉每一个灵感瞬间。隐私安全，本地存储，所有数据全部存储于浏览器。完全开源，永久免费，开启你的写作之旅。",
    formatDetection: {
        address: false,
        email: false,
        date: false,
        telephone: false,
        url: false
    },
    generator: "Next.js",
    icons: [
        {
            url: "/favicon.svg",
            sizes: "any",
            type: "image/svg"
        },
        {
            url: "/favicon-srgb.svg",
            sizes: "any",
            type: "image/svg"
        },
        {
            url: "/favicon-16.png",
            sizes: "16x16",
            type: "image/png"
        },
        {
            url: "/favicon-32.png",
            sizes: "32x32",
            type: "image/png"
        },
        {
            url: "/favicon-64.png",
            sizes: "64x64",
            type: "image/png"
        },
        {
            url: "/favicon-128.png",
            sizes: "128x128",
            type: "image/png"
        },
        {
            url: "/favicon-256.png",
            sizes: "256x256",
            type: "image/png"
        },
        {
            url: "/favicon-512.png",
            sizes: "512x512",
            type: "image/png"
        }
    ],
    keywords: ["css", "dexiejs", "docker", "eslint", "html", "indexeddb", "javascript", "markdown", "netlify", "nextjs", "nodejs", "nvm", "pnpm", "postcss", "prettier", "pwa", "react", "tailwindcss", "typescript", "vercel"],
    manifest: "/manifest.webmanifest",
    referrer: "origin",
    robots: "follow, index",
    title: "SharpNote"
};

const viewport: Viewport = {
    colorScheme: "light dark",
    themeColor: "oklch(98.5% 0 0)"
};

const RootLayout = ({ children }: TRootLayoutProps) => {
    return (
        <html className="bg-zinc-50 text-base scheme-light-dark dark:bg-zinc-950" dir="ltr" lang="zh-Hans-CN">
            <head>{process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID ? <Script id="com.microsoft.clarity" strategy="afterInteractive" type="text/javascript">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID}");`}</Script> : null}</head>
            <body className="mt-16 flow-root font-mono text-zinc-950 dark:text-zinc-50">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
};

export { metadata, viewport };
export default RootLayout;
