"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { feedMessageSchema } from "@/schemas/feedMessageSchema";
import { User } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import { BASE_URL, MESSAGE_DELETE } from "@/constants"
// import { revalidatePath } from "next/cache"
interface FeedInputProps {
    username: string;
    message?: {
        _id: string;
        content: string;
        username: string;
        userId: string;
        reply: string;
        isPublished: boolean;
        createdAt: string;
        __v: number;
    } | null;
    user: User | null;
}

export default function FeedInput({ username, user }: FeedInputProps) {
    // Prohibit sending messages for unverified user
    const form = useForm<z.infer<typeof feedMessageSchema>>({
        resolver: zodResolver(feedMessageSchema),
    });
    if (user && !user.isVerified) {
        return <div>User is not verified</div>
    }

    async function onSubmit(data: z.infer<typeof feedMessageSchema>) {
        try {
            const response = await axios.post<ApiResponse>(`${MESSAGE_DELETE}`, {
                 content: data.content,
            });

            if (response.data.success) {
                toast({
                    title: "Message sent successfully",
                    description: response.data.message,
                    variant: "success",
                }); 

                        } else {
                toast({
                    title: "Failed to send message",
                    description: response.data.message,
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            console.error(error)
            toast({
                title: "An error occurred",
                description: error.message || "Failed to send message, please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Send anonymous message to @{username}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Who is your first crush?"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {user?.isAcceptingMessage ? (
                                    <span className="text-muted-foreground">Your message is anonymous</span>
                                ) : (
                                    <span className="text-red-600">User not accepting messages</span>
                                )}
                            </FormDescription>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    <Send className="h-5 w-5 mr-2" />
                    Send Feed
                </Button>
            </form>
        </Form>
    );
}
