import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/cms/blog';
import { PageHeader } from '@/components/PageHeader';

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
        <div>
            <PageHeader eyebrow={new Date(post.publishedDate).toLocaleDateString()} title={post.title} />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    <article className="mx-auto max-w-3xl">
                        {post.coverImageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.coverImageUrl} alt={post.title} className="h-72 w-full rounded-3xl object-cover" />
                        )}
                        <p className="mt-8 whitespace-pre-line text-lg leading-8 text-slate-600 dark:text-slate-400">{post.content}</p>
                    </article>
                </div>
            </section>
        </div>
    );
}
