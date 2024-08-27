import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        seo_title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        author: z.string().default('hitorilabs'),
        featuredImage: image().refine((img) => img.width >= 1080, {
            message: "Cover image must be at least 1080 pixels wide!",
        }),
        publishDate: z.string().pipe(z.coerce.date()),
    }),
});

const organizationCollection = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        id: z.string().default('hitorilabs'),
        name: z.string().default('hitorilabs'),
        url: z.string().url(),
        logoImage: image().refine((img) => img.width >= 512, {
            message: "Logo image must be at least 512 pixels wide!",
        }),
    }),
});
export const collections = {
    'blog': blogCollection,
    'organization': organizationCollection,
};
