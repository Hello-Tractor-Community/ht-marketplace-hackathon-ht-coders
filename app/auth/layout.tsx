import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Account Management",
    description: "Sign in to your account to access your profile and manage your account settings.",
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className='flex-col justify-center items-center lg:grid lg:grid-cols-2'>
                <div className="hidden h-screen flex-col lg:flex">
                    <video
                        autoPlay
                        loop
                        muted
                        className="h-full w-full object-cover"
                    >
                        <source
                            src="/img/video/1.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='p-10'>
                    <div className="flex lg:w-3/4 flex-col space-y-9 mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
