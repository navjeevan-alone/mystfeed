import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { UserPlus } from "lucide-react"
import FeedInput from './FeedInput';

function SendFeedPage() {
    return (
        <div className='container max-w-[850px] my-4 px-4 py-2'>
            <h1 className="text-center text-4xl mb-4 font-bold">Public Profile Link</h1>
            <FeedInput></FeedInput>
            <div className="flex flex-col gap-2 mt-4 border-t pt-4 align-middle justify-center">
                <p className="text-center">Create your own message board</p>
                <Button className='self-center'>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Account</Button>
            </div>
        </div>
    )
}

export default SendFeedPage