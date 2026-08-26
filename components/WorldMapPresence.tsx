import { readFile } from 'fs/promises';
import path from 'path';
import type { Region } from '@/lib/cms/regions';

const SVG_PATH = path.join(process.cwd(), 'public', 'global', 'world-map.svg');
const SVG_OPEN_TAG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2754 1398">';
const SVG_OPEN_TAG_SCALED =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2754 1398" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">';

let cachedBaseSvg: string | null = null;

async function loadBaseSvg(): Promise<string> {
    if (cachedBaseSvg) return cachedBaseSvg;
    const raw = await readFile(SVG_PATH, 'utf-8');
    cachedBaseSvg = raw.replace(SVG_OPEN_TAG, SVG_OPEN_TAG_SCALED);
    return cachedBaseSvg;
}

export async function WorldMapPresence({ regions }: { regions: Region[] }) {
    const baseSvg = await loadBaseSvg();

    const highlighted = regions.filter(
        (region): region is Region & { isoCode: string } => Boolean(region.isoCode)
    );
    const highlightRules = highlighted
        .map((region) => `.landxx.${region.isoCode}{fill:${region.isHeadquarters ? '#2cb87c' : '#00703f'}}`)
        .join('');

    const overrideStyle = `<style>#ocean{fill:none!important;stroke:none!important}.landxx,.antxx{fill:none;stroke:#e2e8f0;stroke-width:1.6;stroke-linejoin:round}${highlightRules}</style>`;
    const svgMarkup = baseSvg.replace(/<\/svg>$/, `${overrideStyle}</svg>`);

    const markers = regions.filter(
        (region): region is Region & { mapX: number; mapY: number } =>
            typeof region.mapX === 'number' && typeof region.mapY === 'number'
    );
    const headquarters = markers.filter((region) => region.isHeadquarters);
    const otherMarkers = markers.filter((region) => !region.isHeadquarters);

    return (
        <div className="relative mx-auto aspect-[2754/1398] w-full max-w-4xl">
            <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: svgMarkup }} />

            {otherMarkers.map((region) => (
                <span
                    key={region.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] sm:text-sm md:text-base lg:text-lg"
                    style={{ left: `${region.mapX}%`, top: `${region.mapY}%` }}
                >
                    {region.name}
                </span>
            ))}

            {headquarters.map((region) => (
                <div
                    key={region.name}
                    className="absolute -translate-x-1/2 -translate-y-full pb-3"
                    style={{ left: `${region.mapX}%`, top: `${region.mapY}%` }}
                >
                    <div className="relative max-w-[38vw] whitespace-normal rounded-lg bg-slate-50 px-2 py-1.5 text-center text-[9px] font-semibold leading-tight text-slate-900 shadow-lg sm:max-w-none sm:whitespace-nowrap sm:px-3 sm:py-2 sm:text-xs">
                        Global Headquarters - {region.name}
                        <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-50" />
                    </div>
                </div>
            ))}
        </div>
    );
}
