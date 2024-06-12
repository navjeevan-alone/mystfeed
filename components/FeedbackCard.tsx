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

                <Dialog>
                    <DialogTrigger>
                        <Button variant="destructive" className="text-md"><Trash className="h-5 w-5 mr-2" />Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive" >Delete</Button>
                            <DialogClose>
                                <Button variant="outline" >Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </CardFooter>
        </Card>

    )
}

export default FeedbackCard