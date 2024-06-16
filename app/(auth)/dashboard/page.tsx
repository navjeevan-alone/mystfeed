import FeedbackCard from "@/components/FeedbackCard"
import UserLink from "./UserLink"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "./Navbar"
import axios from "axios"
import {BASE_URL} from "@/constants" 

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

export async function fetchMessages() {
    const username ="username6"
    try {
        const res = await axios.get(`${BASE_URL}/api/message/get-all?username=${username}`);
        const messages = res.data.messages || [];
        if (!Array.isArray(messages)) {
            throw new Error('Messages not found or not in expected format');
        } 
        return messages;
    } catch (error: any) {
        console.error("Error fetching messages:", error.message);
        return []; // Return empty array if messages are not found or there's an error
    }

}

export default async function Dashboard() {
    const messages = await fetchMessages()
    return (
        <div className="dashboard">
            <Navbar></Navbar>
            <div className="container sm:mt-12 mt-4 ">
                <h1 className="text-4xl text-left font-semibold  mb-4">User Dashboard</h1>
                <h2 className="text-;g text-left mb-2 pl-1">Share your unique link</h2>
                <UserLink userLink={"user link"} />
                <div className="flex items-center space-x-2 my-4">
                    <Switch id="allow-feedback" />
                    <Label htmlFor="allow-feedback" className=" cursor-pointer text-md">Allow people to send feedbacks</Label>
                </div>
            </div>
            <div className="container mt-10 grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-4  gap-2" >
                <div className="flex justify-between xxl:col-span-4 lg:col-span-3 md:col-span-2 sm:col-span-1  pt-3 border-t ">
                    <h1 className="text-2xl">Your Feedbacks</h1>
                    <Button variant="outline" size="icon">
                        <RotateCw className="h-4 w-4" />
                    </Button>
                </div>
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <FeedbackCard key={message._id} message={message} />
                    ))
                ) : (
                    <h3 className="text-left text-muted-foreground text-xl">No messages to display</h3>
                )}

            </div>
        </div>
    )
}
