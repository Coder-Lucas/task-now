import { type MetadataRoute } from "next";

const Robots = (): MetadataRoute.Robots => {
    return {
        host: "https://shnt.netlify.app",
        rules: {
            allow: "/",
            disallow: ["*#*", "*?*"],
            userAgent: "*"
        },
        sitemap: "https://shnt.netlify.app/sitemap.xml"
    };
};

export default Robots;
