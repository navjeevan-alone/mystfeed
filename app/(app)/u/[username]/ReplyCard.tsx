"use client"
import { useState } from 'react'; 
import { Heart ,MessageSquareQuote} from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming Chakra UI for Button
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { MessageProps } from "@/types/dbObject"
// @ts-ignore
export default function ReplyCard({ message }: MessageProps) {
    // const [liked, setLiked] = useState(false);
    // const [likeCount, setLikeCount] = useState(0);

    // const handleLikeClick = () => {
    //     setLiked(!liked);
    //     setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    // };
     return (
        <Card>
            <CardHeader>
                <CardTitle className="font-normal text-xl" >{message.content}</CardTitle>
                 <CardDescription className="text-lg"><MessageSquareQuote className="mr-2 h-5 w-5 inline" />{message.reply ? message.reply : "Not Replied"}
</CardDescription>
            </CardHeader>
            {/* <CardContent>
                <h1>
                {message.reply}
                </h1>
            </CardContent> */}
                {/*
            <CardFooter>
                 <Button variant="ghost" onClick={handleLikeClick}>
                    <Heart size={20} color={liked ? 'red' : 'white'} className="mr-2 h-5 w-5" />
                    <span>{likeCount}</span>
                </Button>
            </CardFooter>
                 */}
        </Card>
    );
};


