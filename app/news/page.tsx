import Link from 'next/link';
import { getBlogPosts } from '@/lib/cms/blog';
import { PageHeader } from '@/components/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const posts = await getBlogPosts();

    return (
        <div>
            <PageHeader eyebrow="News / Blog" title="Updates from Solstice Group" />

            <section className="bg-white py-16 dark:bg-solstice-950 sm:py-20">
                <div className="container">
                    {posts.length === 0 ? (
                        <p className="text-center text-slate-600 dark:text-slate-400">News and articles will appear here once added in the CMS.</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {posts.map((post, index) => (
                                <ScrollReveal key={post.slug} delayMs={((index % 3) + 1) * 200}>
                                    <Link
                                        href={`/news/${post.slug}`}
                                        className="block h-full overflow-hidden rounded-3xl border border-slate-200 bg-solstice-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/60 dark:bg-solstice-900"
                                    >
                                        {post.coverImageUrl && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={post.coverImageUrl} alt={post.title} className="h-44 w-full object-cover" />
                                        )}
                                        <div className="p-6">
                                            <p className="text-xs uppercase tracking-[0.2em] text-solstice-700 dark:text-solstice-400">
                                                {new Date(post.publishedDate).toLocaleDateString()}
                                            </p>
                                            <h2 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{post.title}</h2>
                                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
