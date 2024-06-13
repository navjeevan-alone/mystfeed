
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="my-2 py-2">
      <div className="min-h-screen">
        <h1 className="text-center text-4xl font-bold">Welcome to</h1>
        <h1 className="text-center text-4xl font-bold">Mist Chat </h1>
        <p className="text-center">Send Anonymous message to your friend</p>
        <Button className="mx-auto" asChild>
          <Link href="/signup">Create Link</Link>
        </Button>
      </div>


    </main>
  );
}
