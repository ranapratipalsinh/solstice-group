import { strapiFind, strapiMediaUrl } from '@/lib/strapi';
import { StrapiMedia } from '@/lib/cms/types';

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    publishedDate: string;
    coverImageUrl: string | null;
};

type RawBlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    publishedDate: string;
    coverImage: StrapiMedia | null;
};

function mapPost(raw: RawBlogPost): BlogPost {
    return {
        slug: raw.slug,
        title: raw.title,
        excerpt: raw.excerpt,
        content: raw.content,
        publishedDate: raw.publishedDate,
        coverImageUrl: strapiMediaUrl(raw.coverImage?.url),
    };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const items = await strapiFind<RawBlogPost>('/blog-posts?populate=coverImage&sort=publishedDate:desc');
    return items.map(mapPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const items = await strapiFind<RawBlogPost>(
        `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=coverImage`
    );
    return items[0] ? mapPost(items[0]) : null;
}
