"use client"
import MessageCard from "@/components/message-card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from '@/components/ui/use-toast';
import axios from "axios"
import { revalidatePath } from "next/cache"
import {BASE_URL} from "@/constants"
export default function MessageList({ messages }) {
    const [messageCards, setMessageCards] = useState(messages);
    const { toast } = useToast();
    const handleDelete = (id) => {
        const updatedCards = messageCards.filter(card => card._id !== id);
        setMessageCards(updatedCards);
        console.log(updatedCards)
        handleDeleteMessage(id)

    };
    const handleDeleteMessage = async (id) => {
        try {
            await axios.delete(`/api/message/delete`, {
                data: {
                    messageId: id
                }
            });


            console.log("Message deleted id:", id);
            toast({
                title: 'Deleted',
                description: 'Message deleted successfully.',
                variant: 'success',
            });
            // TODO : not working casing error 
            // revalidatePath("/dashboard")
        } catch (error) {
            toast({
                title: 'Deletion Failed',
                description:`${error.message || 'An error occurred during deletion'}`,
                variant: 'destructive',
            });
        }

    };

    return (<div className="container mt-10 grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-4  gap-2" >
        <div className="flex justify-between xxl:col-span-4 lg:col-span-3 md:col-span-2 sm:col-span-1  pt-3 border-t ">
            <h1 className="text-2xl">Your Feedbacks</h1>
            {/* TODO : refetch messages on button click and handle spin */}
            <Button variant="outline" size="icon">
                <RotateCw className="h-4 w-4 focus:animate-spin" />
            </Button>
        </div>
        {messageCards.length > 0 ? (
            messageCards.map((message) => (
                <MessageCard key={message._id} message={message} onDelete={handleDelete} />
            ))
        ) : (
            <h3 className="text-left text-muted-foreground text-xl">No messages to display</h3>
        )}

    </div>)
}