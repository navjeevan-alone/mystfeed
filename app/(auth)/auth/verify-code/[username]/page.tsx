'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ApiResponse } from '@/types/ApiResponse';
import { BASE_URL } from '@/constants';
import { cn } from '@/lib/utils';


const verifyCodeSchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits"),
});

export default function VerifyCodeForm() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendTimer, setResendTimer] = useState(10);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams()
    const username = params.username


    const form = useForm({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            code: '',
        },
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        } else {
            setIsResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {

        setIsSubmitting(true);

        if (code === "") {
            setError("Invalid verify code")
        }
        try {
            const response = await axios.post<ApiResponse>(`${BASE_URL}/api/user/verify-code`, { username, verifyCode: data.code });

            toast({
                title: 'Success! You can sign in now.',
                description: response.data.message,
                variant: "success"
            });

            router.replace('/auth/signin'); // Redirect to a dashboard or appropriate page upon success
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            setError(axiosError.response?.data.message || 'Verification failed, please try again.');
            console.log(error)
            toast({
                title: 'Verification Failed',
                description: axiosError.response?.data.message || 'An error occurred during verification.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        setIsResendDisabled(true);
        setResendTimer(10);
        try {
            const response = await axios.post<ApiResponse>(`${BASE_URL}/api/user/resend-verifycode`, { username });
            toast({
                title: 'Success',
                description: 'Verification code resent successfully.',
                variant: "success"
            });

        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;

            toast({
                title: 'Resend Failed',
                description: axiosError.response?.data.message || 'An error occurred while resending the code.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="container min-h-screen grid place-items-center">
            <Card className="verification-card">
                <CardHeader>
                    <CardTitle>Verification Code</CardTitle>
                    <CardDescription>Check your mail for a 6-digit verification code</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" method='POST'>
                        <Input
                            type="text"
                            {...form.register('code')}
                            value={code}
                            onChange={(e) => {
                                form.setValue('code', e.target.value);
                                setCode(e.target.value);
                            }}
                            placeholder="Enter verification code"
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <hr />
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <p className="text-muted-foreground mb-2 text-center">Resend Code after {resendTimer}s</p>
                    <Button type="button" variant="outline" className={cn("w-full", isResendDisabled ? "cursor-not-allowed" : "cursor-pointer")}
                        onClick={handleResend} disabled={isResendDisabled}>
                        Resend Code
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
