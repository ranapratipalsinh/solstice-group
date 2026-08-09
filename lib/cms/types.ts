export type StrapiMedia = {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
};

export type WithId<T> = T & { id: number; documentId: string };
