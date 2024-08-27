
import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import satori, { type SatoriOptions } from "satori";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { OGTemplate } from "@utils/OGTemplate";

interface OGData {
    title: string;
    date: Date;
    image: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
    const blogEntries = await getCollection("blog");
    return blogEntries.map(({ slug, data }) => ({
        params: { slug },
        props: { title: data.title.toUpperCase(), date: data.publishDate, image: data.featuredImage.src },
    }));
};

export const GET: APIRoute<OGData> = async ({ props }) => {
    const fontURL = new URL("../fonts/JetBrainsMono-Bold.ttf", import.meta.url);
    const imageURL = new URL(`../${props.image}`, import.meta.url);
    console.log(props.image)
    const image = (await readFile(imageURL)).toString("base64");
    const options: SatoriOptions = {
        width: 1200,
        height: 630,
        embedFont: true,
        fonts: [
            {
                name: "JetBrainsMono-Bold",
                data: await readFile(fontURL),
                weight: 900,
                style: "normal",
            },
        ],
    };

    const svg = await satori(OGTemplate({ ...props, image: image }, {}), options);
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return new Response(png, {
        headers: { 'Content-Type': 'image/png' },
    });
};
