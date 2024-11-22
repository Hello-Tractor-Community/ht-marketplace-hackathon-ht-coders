import Link from "next/link"
import { UserLoginAuthForm } from '@/components/forms/sign-in'

export default async function SignIn() {
    return (
        <>
            <div className="flex flex-col space-y-2">
                <h1 className="text-4xl font-semibold tracking-tight">
                    Welcome back!
                </h1>
                <p className="text-muted-foreground font-medium">
                    <Link href={""} className="text-primary">Hello Tractor</Link> gives you a marketplace for second-hand tractors that’s simple, secure, and scales globally.
                </p>
            </div>
            <UserLoginAuthForm />
            <p className="text-sm text-muted-foreground">
                Don't have an account? {" "}
                <Link
                    href="/auth/signup"
                    className="text-blue-600 hover:text-primary hover:transition duration-500"
                >
                    Create free account
                </Link>
            </p>
        </>
    )
}