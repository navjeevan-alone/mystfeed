"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Trash, Reply, Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { MESSAGE_REPLY } from "@/constants"
import { formatRelativeTime } from "@/lib/timeUtils" 
 
interface MessageProps {
    _id: string;
    content: string;
    username: string;
    userId: string;
    reply: string | null; // Assuming reply is an empty string when not present
    isPublished: boolean;
    createdAt: string; // Assuming createdAt is a string representation of a date
    __v: number;
};

const feedbackSchema = z.object({
    // TODO: check message should not be empty 
    reply: z.string()
});

type FeedbackSchema = z.infer<typeof feedbackSchema>;
function MessageCard({ message,onDelete }: { message: MessageProps,onDelete:any }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<FeedbackSchema>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            reply: message.reply || '',
        },
    });

    const handleSubmit = async (data: FeedbackSchema) => {
        setIsSubmitting(true);

        try {
            if (data.reply === "") {
                toast({
                    title: "Submission Failed",
                    description: "Reply can't be empty",
                    variant: "destructive"
                })
                return
            }
            if (data.reply === message.reply) {
                toast({
                    title: "Submission Failed",
                    description: "No change in reply",
                    variant: "destructive"
                })
                return
            }
            await axios.post(MESSAGE_REPLY, { messageId: message._id, reply: data.reply });

            toast({
                title: 'Success',
                description: 'Reply submitted successfully.',
                variant: 'success',
            });

        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;

            toast({
                title: 'Submission Failed',
                description: axiosError.response?.data.message || 'An error occurred during submission.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Card className="flex-1 flex-basis-[256px]">
            <CardHeader>
                <CardTitle className="font-normal">{message.content}</CardTitle>
                <CardDescription>

                    {formatRelativeTime(message.createdAt)}</CardDescription>


            </CardHeader>
            <CardContent className='flex-auto'>
                {/* <p>{formatRelativeTime(message.createdAt)}</p> */}
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" method='POST'>
                    <Input
                        type="text"
                        {...form.register('reply')}
                        placeholder="Your reply..."
                    />
                    <div className="flex gap-2 place-items-start">
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                <>
                                    <Reply className="h-5 w-5 mr-1" /> Reply
                                </>
                            )}
                        </Button>

                        <Dialog>
                            <Button variant="destructive" asChild>
                                <DialogTrigger>
                                    <Trash className="h-5 w-5" />
                                </DialogTrigger>
                            </Button>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete this feedback!
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex gap-2 tracking-wide">
                                    <DialogClose>
                                        <Button variant="outline" role={"span"} >
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button variant="destructive" onClick={() => onDelete(message._id)}>Delete</Button> 

                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </form>
            </CardContent>
            
        </Card>
    );
}

export default MessageCard;
