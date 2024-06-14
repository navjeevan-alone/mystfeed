import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
function error() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="container flex flex-col gap-2 justify-center items-center">
        <span className="text-9xl text-center font-bold traking-wide">404
        </span>
        <h1 className="text-3xl text-center font-bold traking-wide">Page not Found!</h1>
        <p className="text-xl text-center">
          This page doesnt exists
        </p>
        <Button asChild>
          <Link href="/dashboard"> Go To Homepage
          </Link>
        </Button>
      </div> 
    </div>
  )
}

export default error