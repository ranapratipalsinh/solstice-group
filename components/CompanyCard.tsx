import Link from 'next/link';
import { Company } from '@/lib/cms/companies';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export function CompanyCard({ company }: { company: Company }) {
    const initials = company.name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('');

    return (
        <article className="flex flex-col rounded-tl-[3rem] rounded-tr-xl rounded-bl-xl rounded-br-[3rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-solstice-100 ring-1 ring-solstice-200">
                <ImageWithFallback
                    src={company.logoUrl}
                    alt={company.name}
                    className="h-full w-full object-contain p-2"
                    fallback={<span className="text-xl font-bold text-solstice-700">{initials}</span>}
                />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-950">{company.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{company.tagline}</p>
            <Link
                href={`/companies/${company.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-solstice-700 hover:text-solstice-900"
            >
                Read More <span aria-hidden="true">›</span>
            </Link>
        </article>
    );
}
