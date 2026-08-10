import Link from 'next/link';
import { getBlogPosts } from '@/lib/cms/blog';
import { ScrollReveal } from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container py-16">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-solstice-700">News / Blog</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">Updates from Solstice Group</h1>
                {posts.length === 0 ? (
                    <p className="mt-10 text-slate-600">News and articles will appear here once added in the CMS.</p>
                ) : (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {posts.map((post, index) => (
                            <ScrollReveal key={post.slug} delayMs={((index % 3) + 1) * 200}>
                                <Link
                                    href={`/news/${post.slug}`}
                                    className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {post.coverImageUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={post.coverImageUrl} alt={post.title} className="h-44 w-full object-cover" />
                                    )}
                                    <div className="p-6">
                                        <p className="text-xs uppercase tracking-[0.2em] text-solstice-700">
                                            {new Date(post.publishedDate).toLocaleDateString()}
                                        </p>
                                        <h2 className="mt-2 text-lg font-semibold text-slate-950">{post.title}</h2>
                                        <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
