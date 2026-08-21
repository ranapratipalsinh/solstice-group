import { LucideIcon } from 'lucide-react';

export function FeatureCard({
    icon: Icon,
    title,
    description,
    tone = 'light',
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    tone?: 'light' | 'tint';
}) {
    return (
        <div
            className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-solstice-900/5 ${
                tone === 'tint'
                    ? 'border-solstice-100 bg-solstice-50/60 hover:border-solstice-300 hover:bg-white'
                    : 'border-slate-100 bg-white hover:border-solstice-200'
            }`}
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-solstice-50 text-solstice-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-solstice-600 group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-slate-600 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-100">
                {description}
            </p>
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-solstice-50 opacity-0 transition-all duration-500 group-hover:opacity-60 group-hover:scale-125" />
        </div>
    );
}
