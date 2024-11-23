"use client"
import { toast } from "sonner";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithPhone, verifyOTP } from '@/lib/actions'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>("")
    const [step, setStep] = useState<number>(0)

    const formSchema = z.object({
        phone: z.string().min(10, {
            message: "Please enter a valid phone number"
        }),
    })

    const verifyOtpFormSchema = z.object({
        otp: z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
        },
    })

    const otpForm = useForm<z.infer<typeof verifyOtpFormSchema>>({
        resolver: zodResolver(verifyOtpFormSchema),
        defaultValues: {
            otp: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const response = await signInWithPhone(values.phone);
            setIsLoading(false);
            if (!response.success) {
                toast.error(response.message, { className: 'bg-red-500 text-white', });
            } else {
                setUserId(response.userId ?? "");
                toast.success("OTP sent successfully", { className: 'bg-green-500 text-white', });
                setStep(1);
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.message, { className: 'bg-red-500 text-white', });
        }
    };

    const onSubmitVerifyOtp = (data: z.infer<typeof verifyOtpFormSchema>) => {
        setIsLoading(true);
        verifyOTP(userId, +data.otp).then(async (response) => {
            if (response.success) {
                toast.success("OTP verified successfully", { className: 'bg-green-500 text-white', });
                await signIn('credentials', { phone: form.getValues("phone") });
                toast.success("Successfully signed in", { className: 'bg-green-500 text-white', });
            } else {
                toast.error(response.message, { className: 'bg-red-500 text-white', });
            }
            setIsLoading(false);
        }).catch((error: any) => {
            toast.error(error.message, { className: 'bg-red-500 text-white', });
            setIsLoading(false);
        });
    }

    return (
        <>
            <Progress value={step === 0 ? 50 : 100} />
            <div className={cn("grid gap-5", className)} {...props}>
                {step === 0 && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="after:content-['*'] after:text-red-500 after:ml-1 font-semibold">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} placeholder="Eg. 0717255460" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Button disabled={isLoading} size={"lg"} className='w-full'>
                                {isLoading && (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Sign In
                            </Button>
                        </form>
                    </Form>
                )}
                {step === 1 && (
                    <Form {...otpForm}>
                        <form onSubmit={otpForm.handleSubmit(onSubmitVerifyOtp)} className="space-y-6">
                            <FormField
                                control={otpForm.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="after:content-['*'] after:text-red-500 after:ml-1 font-semibold">Enter OTP sent to your phone or email</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot className='h-14 w-20' index={0} />
                                                    <InputOTPSlot className='h-14 w-20' index={1} />
                                                    <InputOTPSlot className='h-14 w-20' index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator className='text-primary' />
                                                <InputOTPGroup>
                                                    <InputOTPSlot className='h-14 w-20' index={3} />
                                                    <InputOTPSlot className='h-14 w-20' index={4} />
                                                    <InputOTPSlot className='h-14 w-20' index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <p className="text-sm text-muted-foreground">
                                Didn't receive the otp? {" "}
                                <span
                                    onClick={() => {
                                        signInWithPhone(form.getValues("phone")).then(() => {
                                            toast.success("OTP sent successfully", {
                                                className: 'bg-green-500 text-white',
                                            });
                                        }).catch((error: any) => {
                                            toast.error(error.message, {
                                                className: 'bg-red-500 text-white',
                                            });
                                        });
                                    }}
                                    className="text-blue-600 hover:text-primary hover:transition duration-500 cursor-pointer"
                                >
                                    Resend OTP
                                </span>
                            </p>
                            <Button disabled={isLoading} size={"lg"} className='w-full'>
                                {isLoading && (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Verify OTP
                            </Button>
                        </form>
                    </Form>
                )}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or
                        </span>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        setIsLoadingGoogle(true)
                        signIn("google", { redirectTo: "/" })
                    }}
                    variant="outline" type="button" size={"lg"} className='border-primary' disabled={isLoadingGoogle}>
                    {isLoadingGoogle ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 48 48"
                            >
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Sign in with Google
                        </>
                    )}
                </Button>
            </div>
        </>
    )
}