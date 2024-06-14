"use client"
import { signIn } from "next-auth/react"

export default function page() {
    return(
    <button onClick={() => signIn('credentials', { redirect: false, password: 'password' })
    }>Sign in with Email</button>
)
}
