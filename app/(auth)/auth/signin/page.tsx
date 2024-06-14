"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import LoginButton  from "@/components/login-button"
export default function page() {
    return (
        <div>
            <LoginButton />
        </div>
    )
}
