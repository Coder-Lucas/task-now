import sharp from "sharp";

(async () => {
    const sizes = [16, 32, 64, 128, 256, 512];

    try {
        for (const size of sizes) {
            await sharp("public/favicon-srgb.svg")
                .resize(size, size)
                .png({
                    adaptiveFiltering: true,
                    colors: 256,
                    compressionLevel: 9,
                    dither: 1,
                    effort: 10,
                    palette: true,
                    progressive: false,
                    quality: 100
                })
                .toFile(`public/favicon-${size}.png`);
        }
    } catch (error) {
        console.error(`ERROR: ${error}`);
        process.exit(1);
    }
})().then();
