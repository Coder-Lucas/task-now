import { type MetadataRoute } from "next";

const Sitemap = (): MetadataRoute.Sitemap => {
    return [
        {
            lastModified: new Date(),
            url: "https://shnt.netlify.app"
        },
        {
            lastModified: new Date(),
            url: "https://shnt.netlify.app/fn"
        },
        {
            lastModified: new Date(),
            url: "https://shnt.netlify.app/fn/new"
        },
        {
            lastModified: new Date(),
            url: "https://shnt.netlify.app/fn/trash"
        },
        {
            lastModified: new Date(),
            url: "https://shnt.netlify.app/settings"
        },
        {
            lastModified: new Date(),
            url: "https://shnt.netlify.app/about"
        },
        {
            lastModified: new Date(),
            url: "https://shnt.netlify.app/docs"
        }
    ];
};

export default Sitemap;
