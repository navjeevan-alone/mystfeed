import React from 'react'
import Link from "next/link"
import { Button } from '@/components/ui/button'
function Navbar() {
    return (
        <div className="py-4 px-6 mb-6 bg-slate-800">
            <div className="container flex justify-between align-middle">
                <Link href="/">
                    <h1 className="feedUp text-3xl font-bold">Mist Chat
                    </h1>
                </Link>
                <Button asChild>
                    <Link href="/signout">
                        Log Out
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Navbar