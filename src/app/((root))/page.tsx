'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <section className='p-3 flex flex-col justify-between items-center'>
      <div className='w-full'>
        <h1 className='text-5xl'>Dashboard</h1>
      </div>
      <button onClick={() => signIn("credentials")}>Sign in</button>
      <span className='mt-10 text-2xl'>Site is under maintenance...😉</span>
    </section>
  )
}
