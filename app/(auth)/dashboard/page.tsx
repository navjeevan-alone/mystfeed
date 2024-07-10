
import UserLink from "./UserLink"
import Navbar from "./Navbar"
import axios from "axios"
import { BASE_URL } from "@/constants"
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { MessageProps } from "@/types/dbObject"
import { auth } from "@/auth"
import MessageList from "./MessageList"
export async function fetchMessages(username:string) {
    try {
        const res = await axios.get(`${BASE_URL}/api/message/get-all?username=${username}`);
        const messages = res.data.messages || [];
        if (!Array.isArray(messages)) {
            throw new Error('Messages not found or not in expected format');
        }
        return messages;
    } catch (error: any) {
        console.error("Error fetching messages:", error.message);
        return []; // Return empty array if messages are not found or there's an error
    }
}

export default async function Dashboard() {
    dbConnect()
    const session = await auth()
    const user = await UserModel.findOne({ username:session?.user.username })
    // @ts-ignore
    const messages = await fetchMessages(session?.user.username)
    
    return (
        <div className="dashboard">
            <Navbar username={session?.user.username}></Navbar>
            <div className="container sm:mt-12 mt-4 ">
                <h1 className="text-4xl text-left font-semibold  mb-4">User Dashboard</h1>
                <h2 className="text-lg text-left mb-2 pl-1">Share your unique link</h2>
                {
                    user && <UserLink isAcceptingMessage={user?.isAcceptingMessage} username={user?.username}  />
                }
            </div>
<MessageList messages={messages}/>
        </div>
    )
}
