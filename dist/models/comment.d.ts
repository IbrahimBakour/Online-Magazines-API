export declare enum CommentStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}
export interface Comment {
    id: number;
    articleId: number;
    userId: number;
    content: string;
    status: CommentStatus;
    createdAt: string;
}
