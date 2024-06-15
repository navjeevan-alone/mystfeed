"use client"
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Clipboard } from "lucide-react"
import { copyToClipboard } from '@/lib/clipboard'
import { useToast } from '@/components/ui/use-toast';

function UserLink({ userLink }: { userLink: string }) {
    const [text, setText] = useState(userLink);
    const [buttonText, setButtonText] = useState("Copy")
    const handleCopy = () => {
        let textChange;
        clearTimeout(textChange)
        copyToClipboard(text);
        setButtonText("Copied")
        textChange = setTimeout(() => {
            setButtonText("Copy")
        }, 3000)

        toast({
            title: "Text copied to clipboard"
        })

    };
    const { toast } = useToast();

    return (<div className="user-link flex flex-col sm:flex-row gap-2">
        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} className=" bg-muted text-muted-foreground text-md" disabled />
        <Button variant="default" onClick={handleCopy}><Clipboard className="h-5 w-5 mr-2" />{buttonText}</Button>
    </div>
    )
}

export default UserLink