"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { feedMessageSchema } from "@/schemas/feedMessageSchema"

const FormSchema = z.object({
    content: z
        .string()
        .min(10, {
            message: "content must be at least 10 characters.",
        })
        .max(160, {
            message: "content must not be longer than 30 characters.",
        }),
})

export default function FeedInput() {
    const form = useForm<z.infer<typeof feedMessageSchema>>({
        resolver: zodResolver(feedMessageSchema),
    })

    function onSubmit(data: z.infer<typeof feedMessageSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg" >Send anonymous message to @username</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Who is your first crush ?"
                                    className="resize-none text-md"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Your message is anonymous
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    <Send className="h-5 w-5 mr-2" />
                    Send Feed</Button>

            </form>
        </Form>
    )
}
