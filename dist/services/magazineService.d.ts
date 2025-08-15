export declare function createMagazine(title: string, description: string, publisherId: number): Promise<{
    id: number;
    title: string;
    description: string;
    publisherId: number;
}>;
export declare function getMagazines(): Promise<{
    id: number;
    title: string;
    description: string;
    publisherId: number;
}[]>;
export declare function getMagazineById(id: number): Promise<{
    id: number;
    title: string;
    description: string;
    publisherId: number;
} | null>;
