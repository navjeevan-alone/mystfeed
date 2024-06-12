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

function UserLink({ userLink }: { userLink: string }) {
    const [text, setText] = useState(userLink);
    const [buttonText, setButtonText] = useState("Copy")
    const handleCopy = () => {
        copyToClipboard(text);
        setButtonText("Copied")
        setTimeout(() => {
            setButtonText("Copy")
        }, 3000)
    };

    return (<div className="user-link flex flex-col sm:flex-row gap-2">
        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} className="text-md bg-slate-800" disabled />
        <Button variant="default" onClick={handleCopy}><Clipboard className="h-5 w-5 mr-2" />{buttonText}</Button>
     </div>
    )
}

export default UserLink