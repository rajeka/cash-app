import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/nextjs';
import { ChartColumnBigIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen h-[calc(100vh-80px)] bg-white relative">
      <Image
        src="/trans_cover.png"
        fill
        className="object-cover opacity-80"
        alt="cover image"
      />
      <div className="z-10 text-center">
        <div className="absolute top-[350px] right-[100px] flex flex-col gap-4 w-[320px]">
          <h1 className="text-5xl font-bold flex gap-1 items-center justify-center">
            <ChartColumnBigIcon className="text-lime-500" size={45} />
            Cash App
          </h1>
          <p className="text-2xl">Track your finances with ease</p>
          <SignedIn>
            <Button asChild size="lg">
              <Link href="/dashboard">Go To Your Dashboard</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <div className="flex gap-2 items-center justify-center">
              <Button
                asChild
                size="lg"
                className="bg-lime-600 hover:bg-lime-500"
              >
                <SignInButton />
              </Button>
              <Button asChild size="lg">
                <SignOutButton />
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
      <footer className="py-4 text-center border-t-2 relative">
        <p className="text-sm text-gray-600 fixed left-90 bottom-0 mb-5">
          &copy; {new Date().getFullYear()} Cash App. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
