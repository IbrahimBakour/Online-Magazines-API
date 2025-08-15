export declare function addComment(articleId: number, userId: number, content: string): Promise<{
    id: number;
    content: string;
    status: import("@prisma/client").$Enums.CommentStatus;
    userId: number;
    createdAt: Date;
    articleId: number;
}>;
export declare function getCommentsByArticle(articleId: number): Promise<{
    id: number;
    content: string;
    status: import("@prisma/client").$Enums.CommentStatus;
    userId: number;
    createdAt: Date;
    articleId: number;
}[]>;
export declare function blockComment(commentId: number): Promise<{
    id: number;
    content: string;
    status: import("@prisma/client").$Enums.CommentStatus;
    userId: number;
    createdAt: Date;
    articleId: number;
}>;
export declare function unblockComment(commentId: number): Promise<{
    id: number;
    content: string;
    status: import("@prisma/client").$Enums.CommentStatus;
    userId: number;
    createdAt: Date;
    articleId: number;
}>;
