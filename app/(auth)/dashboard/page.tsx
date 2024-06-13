import FeedbackCard from "@/components/FeedbackCard"
import UserLink from "./UserLink"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "./Navbar"


function Dashboard() {
    return (
        <div className="dashboard">
            <Navbar></Navbar>
            <div className="container sm:mt-12 mt-4 ">
                <h1 className="text-4xl text-left font-semibold  mb-4">User Dashboard</h1>
                <h2 className="text-;g text-left mb-2 pl-1">Share your unique link</h2>
                <UserLink userLink={"user link"} />
                <div className="flex items-center space-x-2 my-4">
                    <Switch id="allow-feedback" />
                    <Label htmlFor="allow-feedback" className=" cursor-pointer text-md">Allow people to send feedbacks</Label>
                </div>
            </div>
            <div className="container mt-10 grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-4  gap-2" >
                <div className="flex justify-between xxl:col-span-4 lg:col-span-3 md:col-span-2 sm:col-span-1  pt-3 border-t ">
                    <h1 className=" text-2xl">Your Feedbacks</h1>
                    <Button variant="outline" size="icon">
                        <RotateCw className="h-4 w-4" />
                    </Button>
                </div>
                <FeedbackCard message="Hi what are you doing babes" id="1" timestamp={'Jan 12, 24 8:44PM'} ></FeedbackCard>
                <FeedbackCard message="Hi what are you doing babes" id="1" timestamp={'Jan 12, 24 8:44PM'} ></FeedbackCard>
                <FeedbackCard message="Hi what are you doing babes" id="1" timestamp={'Jan 12, 24 8:44PM'} ></FeedbackCard>
            </div>
        </div>
    )
}

export default Dashboard