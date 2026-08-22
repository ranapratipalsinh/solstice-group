import type { Region } from '@/lib/cms/regions';

export function WorldMapPresence({ regions }: { regions: Region[] }) {
    const markers = regions.filter(
        (region): region is Region & { mapX: number; mapY: number } =>
            typeof region.mapX === 'number' && typeof region.mapY === 'number'
    );

    return (
        <div className="relative mx-auto aspect-[2754/1398] w-full max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/global/world-map.svg"
                alt="World map"
                className="absolute inset-0 h-full w-full object-contain opacity-30"
            />
            {markers.map((region) => (
                <div
                    key={region.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${region.mapX}%`, top: `${region.mapY}%` }}
                >
                    <div className="relative flex flex-col items-center">
                        <span className="relative flex items-center justify-center">
                            <span
                                className={
                                    region.isHeadquarters
                                        ? 'absolute inline-flex h-full w-full animate-ping rounded-full bg-solstice-400 opacity-75'
                                        : 'absolute inline-flex h-full w-full animate-ping rounded-full bg-solstice-500 opacity-50'
                                }
                            />
                            <span
                                className={
                                    region.isHeadquarters
                                        ? 'relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-solstice-400 shadow-[0_0_12px_4px_rgba(93,210,156,0.55)]'
                                        : 'relative inline-flex h-2.5 w-2.5 rounded-full bg-solstice-500 shadow-[0_0_8px_2px_rgba(93,210,156,0.4)]'
                                }
                            />
                        </span>
                        <span
                            className={
                                region.isHeadquarters
                                    ? 'mt-2 whitespace-nowrap rounded-full bg-solstice-400 px-3 py-1 text-xs font-bold text-solstice-950 shadow-md'
                                    : 'mt-2 whitespace-nowrap rounded-full bg-solstice-950/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md ring-1 ring-white/10'
                            }
                        >
                            {region.name}
                            {region.isHeadquarters ? ' (HQ)' : ''}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
