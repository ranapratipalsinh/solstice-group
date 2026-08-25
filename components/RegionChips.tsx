import { Building2, MapPin } from 'lucide-react';
import type { Region } from '@/lib/cms/regions';

export function RegionChips({ regions }: { regions: Region[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {regions.map((region) =>
                region.isHeadquarters ? (
                    <div
                        key={region.name}
                        className="flex items-center gap-3 rounded-2xl bg-solstice-400 px-5 py-3 shadow-[0_0_25px_rgba(93,210,156,0.35)]"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-solstice-950">
                            <Building2 className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span className="leading-tight">
                            <span className="block font-display text-base font-bold text-solstice-950">{region.name}</span>
                            <span className="block text-[10px] font-semibold uppercase tracking-widest text-solstice-950/70">
                                Headquarters
                            </span>
                        </span>
                    </div>
                ) : (
                    <div
                        key={region.name}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition-colors hover:border-solstice-400/50 hover:bg-white/10"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-solstice-400">
                            <MapPin className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span className="font-display text-base font-bold text-white">{region.name}</span>
                    </div>
                )
            )}
        </div>
    );
}
