export interface MessageProps {
    _id: string;
    content: string;
    username: string;
    userId: string;
    reply: string | null; // Assuming reply is an empty string when not present
    isPublished: boolean;
    createdAt: string; // Assuming createdAt is a string representation of a date
    __v: number;
};
