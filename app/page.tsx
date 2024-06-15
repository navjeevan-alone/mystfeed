
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (

    <div className="min-h-screen flex items-center">
      <div className="container flex flex-col gap-2 justify-center items-center">
        <h1 className="text-center text-4xl font-bold"></h1>
        <h1 className="text-center text-4xl font-bold">Welcome to Myst Chat </h1>
        <p className="text-center">A place to troll your friend without getting caught!</p>
        <Button className="mx-auto" asChild>
          <Link href="/signup">Create Link</Link>
        </Button>
      </div>
    </div>


  );
}
