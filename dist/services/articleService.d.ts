export declare function createArticle(title: string, content: string, magazineId: number, authorId: number): Promise<{
    id: number;
    content: string;
    title: string;
    magazineId: number;
    authorId: number;
}>;
export declare function getArticlesByMagazine(magazineId: number): Promise<{
    id: number;
    content: string;
    title: string;
    magazineId: number;
    authorId: number;
}[]>;
export declare function getArticleById(id: number): Promise<{
    id: number;
    content: string;
    title: string;
    magazineId: number;
    authorId: number;
} | null>;
