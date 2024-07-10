import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { UserPlus } from "lucide-react"
import FeedInput from './FeedInput';
import ReplyCard from './ReplyCard';
import { UserModel } from "@/model/User"
import { MessageModel } from "@/model/Message"
import { dbConnect } from '@/lib/dbConnect'
import { MessageProps } from '@/types/dbObject'

export default async function Page({ params }: { params: { username: string } }) {
    const username = params.username;
    // Always connect to database first 
    await dbConnect()
    const user = await UserModel.findOne({ username })
    const messages = await MessageModel.find({ username })
    // Convert user to a plain object
    const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;
    const plainMessages = messages ? JSON.parse(JSON.stringify(messages)) : null;
    // User don't exists
    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center flex-col">
                <h1 className="text-center font-bold text-4xl mb-2 py-4" > Invalid Link
                </h1>
                <p className="text-center mb-4 ">
                    User does not exits! Check username
                </p>
                <Button className='self-center' asChild>
                    <Link href="/auth/signup">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                    </Link>
                </Button>
            </div>
        )
    }
    // User exists
    return (
        <div className='container max-w-[850px] my-4 px-4 py-2'>
            <h1 className="text-center text-4xl mb-4 font-bold">Public Profile Link</h1>
            <FeedInput username={username} user={plainUser}></FeedInput>
            <Separator className="my-2" />

            {/* TODO: Arrange in proper cards and include typesafety */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 grid-cols-1 py-4">
                {plainMessages.map((message: MessageProps) => (
                    <ReplyCard key={message._id} message={message} />
                ))
                }
            </div>

            <div className="flex flex-col gap-2 py-4 align-middle justify-center">
                <p className="text-center">Create your own message board</p>
                <Button className='self-center' asChild>
                    <Link href="/auth/signup">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                    </Link>
                </Button>
            </div>

        </div >
    )
}
