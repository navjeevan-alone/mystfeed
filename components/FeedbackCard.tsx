"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { Trash, Reply } from "lucide-react"
import React from 'react'
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from "@/lib/timeUtils"
import { Message } from "@/model/Message"
interface Props {
    _id: string;
    content: string;
    username: string;
    userId: string;
    reply: string | null; // Assuming reply can be null based on your sample
    isPublished?: boolean;
    createdAt?: string; // Assuming createdAt is a string representation of a date
    __v?: number;
}
function FeedbackCard({ message }: Message) {
    return (
        <Card className=" flex-1 flex-basis-[256px] ">
            <CardHeader>
                <CardTitle className="font-normal" >{message.content}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <p>{formatRelativeTime(message.createdAt)}</p>
            </CardContent>
            <CardFooter className="flex gap-2 place-items-start">
                <Button variant="default" className=""><Reply className="h-5 w-5 mr-1" /> Reply</Button>

                <Dialog>
                    <Button variant="destructive" asChild>
                        <DialogTrigger>
                            <Trash className="h-5 w-5 mr-2" />
                            Delete
                        </DialogTrigger>
                    </Button>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete this feedback!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex gap-4" >
                            <DialogClose>
                                Cancel
                            </DialogClose>
                            <Button variant="destructive" >Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>

    )
}

export default FeedbackCard