const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type StrapiListResponse<T> = {
    data: (T & { id: number; documentId: string })[];
};

type StrapiItemResponse<T> = {
    data: (T & { id: number; documentId: string }) | null;
};

async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
    const response = await fetch(`${STRAPI_URL}/api${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers,
        },
        next: { revalidate: 60 },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Strapi request failed (${response.status}): ${path}`);
    }

    return response.json() as Promise<T>;
}

export async function strapiFind<T>(path: string): Promise<(T & { id: number; documentId: string })[]> {
    const result = await strapiFetch<StrapiListResponse<T>>(path);
    return result?.data ?? [];
}

export async function strapiFindOne<T>(path: string): Promise<(T & { id: number; documentId: string }) | null> {
    const result = await strapiFetch<StrapiItemResponse<T>>(path);
    return result?.data ?? null;
}

export function strapiMediaUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

export async function strapiCreate(
    resourcePath: string,
    payload: Record<string, unknown>
): Promise<Response> {
    const token = process.env.STRAPI_API_TOKEN;
    if (!token) {
        throw new Error('STRAPI_API_TOKEN is not configured');
    }

    return fetch(`${STRAPI_URL}/api${resourcePath}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: payload }),
    });
}
