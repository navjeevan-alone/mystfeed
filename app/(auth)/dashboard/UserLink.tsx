"use client"
import { useState,useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Clipboard } from "lucide-react"
import { copyToClipboard } from '@/lib/clipboard'
import { useToast } from '@/components/ui/use-toast';
import axios from "axios"
import { BASE_URL } from "@/constants"



function UserLink({ isAcceptingMessage, username }: { isAcceptingMessage: boolean, username: string }) {
    const userLinkText = `http://localhost:3000/u/${username}`
    const [buttonText, setButtonText] = useState("Copy")
    const [toggleIsAccepting, setToggleIsAccepting] = useState(isAcceptingMessage);
    const handleCopy = () => {
        let textChange;
        clearTimeout(textChange)
        copyToClipboard(userLinkText);
        setButtonText("Copied")
        textChange = setTimeout(() => {
            setButtonText("Copy")
        }, 5000)

        toast({
            description: "Text copied to clipboard"
        })

    };
    const { toast } = useToast();
    
    useEffect(() => {
        const toggleAcceptingMessages = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/api/user/toggle-allow-message`, { username });
                console.log("Response from /api/user/toggle:", response.data);
                // Assuming the response contains the updated isAcceptingMessage status
                setToggleIsAccepting(response.data.isAcceptingMessage);
            } catch (error) {
                console.error("Error toggling message acceptance:", error);
            }
        };
        toggleAcceptingMessages();
    }, [toggleIsAccepting,username]);

    return (
        <>
            <div className="user-link flex flex-col sm:flex-row gap-2">
                <Input type="text" value={userLinkText} className=" bg-muted text-muted-foreground text-md" disabled />
                <Button variant="default" onClick={handleCopy}><Clipboard className="h-5 w-5 mr-2" />{buttonText}</Button>
            </div>
            <div className="flex items-center space-x-2 my-4">
                <Switch id="allow-feedback" checked={toggleIsAccepting} onClick={() => setToggleIsAccepting(!toggleIsAccepting)} />
                <Label htmlFor="allow-feedback" className=" cursor-pointer text-md">Allow people to send feedbacks</Label>
            </div>
        </>
    )
}

export default UserLink