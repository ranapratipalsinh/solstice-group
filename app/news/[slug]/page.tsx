import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/cms/blog';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container py-16">
            <article className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">
                    {new Date(post.publishedDate).toLocaleDateString()}
                </p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">{post.title}</h1>
                {post.coverImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImageUrl} alt={post.title} className="mt-8 h-72 w-full rounded-3xl object-cover" />
                )}
                <p className="mt-8 whitespace-pre-line text-lg leading-8 text-slate-600">{post.content}</p>
            </article>
        </div>
    );
}
