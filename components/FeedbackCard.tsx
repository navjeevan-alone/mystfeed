import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Trash, Reply } from "lucide-react"
import React from 'react'
import { Button } from '@/components/ui/button';
interface Props {
    id: String,
    message: String,
    timestamp: String
}
function FeedbackCard({ id, message, timestamp }: Props) {
    return (
        <Card className=" flex-1 flex-basis-[256px] ">
            <CardHeader>
                <CardTitle className="font-normal" >{message}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <p>{timestamp}</p>
            </CardContent>
            <CardFooter className="flex gap-2 place-items-start">
                <Button variant="default" className="text-md"><Reply className="h-5 w-5 mr-1" /> Reply</Button>
                <Button variant="destructive" className="text-md"><Trash className="h-5 w-5 mr-2" />Delete</Button>
            </CardFooter>
        </Card>

    )
}

export default FeedbackCard