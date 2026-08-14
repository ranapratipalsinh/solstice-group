import { Company } from '@/lib/cms/companies';
import SocialCards, { CardItem } from '@/components/ui/card-fan-carousel';

const IMAGE_BY_KEYWORD: { keyword: string; src: string }[] = [
    { keyword: 'import', src: '/companies/import-export.jpg' },
    { keyword: 'bath', src: '/companies/bath.jpg' },
    { keyword: 'spice', src: '/companies/spices.jpg' },
    { keyword: 'event', src: '/companies/event.jpg' },
];

function imageForCompany(slug: string) {
    const match = IMAGE_BY_KEYWORD.find((item) => slug.includes(item.keyword));
    return match?.src ?? '/companies/import-export.jpg';
}

export function CompanyFanShowcase({ companies }: { companies: Company[] }) {
    if (!companies.length) return null;

    const cards: CardItem[] = companies.map((company) => ({
        imgUrl: imageForCompany(company.slug),
        alt: company.name,
        linkUrl: `/companies/${company.slug}`,
    }));

    return (
        <section className="bg-solstice-950 py-16 text-white sm:py-20">
            <div className="container text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-solstice-300">Our Companies</p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
                    A Group Built On Trusted Ventures
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-solstice-100 sm:text-base">
                    Hover a card to bring it forward, or click through to explore each subsidiary.
                </p>
            </div>
            <SocialCards cards={cards} />
        </section>
    );
}
