import React from 'react'
import Link from "next/link"
import { Button } from '@/components/ui/button'

import LoginButton from '@/components/login-button';
import { ModeToggle, SimpleModeToggle } from '@/components/ui/toggle-theme';
function Navbar({username}) {
    return (
        <div className="py-4 px-6 mb-6 bg-slate-900 text-accent dark:bg-slate-800 dark:text-white ">
            <div className="container flex justify-between align-middle">
                <Link href="/">
                    <h1 className="feedUp text-3xl font-bold">Mist Chat
                    </h1>
                </Link>
                <h2 className="text-2xl pt-1" >Welcome, {username}</h2>
                <div className="flex align-middle gap-3">
                    <LoginButton/>
                    <SimpleModeToggle />

                </div>
            </div>
        </div>
    )
}

export default Navbar