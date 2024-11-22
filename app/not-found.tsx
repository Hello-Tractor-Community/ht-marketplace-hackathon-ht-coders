import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <Image src={"/not-found.svg"} alt='Not Found Image' width={600} height={600} />
            <p className='font-medium'>Could not find requested resource</p>
            <Button variant="link">
                <Link href="/" className='mt-2 hover:underline flex items-center'>
                    <MoveLeft className='mr-2' /> Return Home
                </Link>
            </Button>

        </div>
    )
}