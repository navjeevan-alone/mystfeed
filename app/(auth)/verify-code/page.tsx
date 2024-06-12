"use client"
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function VerificationCard() {
    const [error, setError] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Perform verification code submission logic here
        if (code.length !== 6) {
            setError('Verification code must be 6 digits long');
        } else {
            setError('');
            // Submit the code
        }
    };
    return (
        <div className="container min-h-screen grid  place-items-center ">
            <Card className="verification-card">
                <CardHeader>
                    <CardTitle>Verification Code</CardTitle>
                    <CardDescription>Check your mail for 6 digit verfication code </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter verification code"
                        />
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <hr />
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <p className="text-muted-foreground mb-2 text-center">Resend Code after {"01:50"}s</p>
                    <Button type="button" variant="outline" className="w-full">
                        Resend Code
                    </Button>

                </CardFooter>
            </Card>

        </div>

    )
}

export default VerificationCard