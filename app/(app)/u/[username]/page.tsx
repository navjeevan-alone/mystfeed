import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Link from "next/link"
import { UserPlus } from "lucide-react"
import FeedInput from './FeedInput';
import { UserModel } from "@/model/User"
import { MessageModel } from "@/model/Message"
import { dbConnect } from '@/lib/dbConnect'

export default async function Page({ params }: { params: { username: string } }) {
    const username = params.username;
    // Always connect to database first 
    await dbConnect()
    const user = await UserModel.findOne({ username })
    const messages = await MessageModel.find({ username })
    console.log(messages)
    // Convert user to a plain object
    const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;
    
    // User don't exists
    if(!user){
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
            <div className="flex flex-col gap-2 mt-4 border-t pt-4 align-middle justify-center">
                <p className="text-center">Create your own message board</p>
                <Button className='self-center' asChild>
                    <Link href="/auth/signup">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                    </Link>
                </Button>
            </div>
            {/* TODO: Arrange in proper cards and include typesafety */}
            {messages &&
                messages.map((message) => (
                    <p key={message.id}>{message.content}</p>
                ))
            }

        </div >
    )
}
