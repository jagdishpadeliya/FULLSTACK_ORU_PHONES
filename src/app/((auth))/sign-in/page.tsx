import React from 'react'
import SignIn from '@/components/Login/form'
import Image from 'next/image'
const page = () => {
    return (
        <main className=''>
            <span className='text-5xl font-bold my-10 inline-block'>Sign In</span>
            <SignIn />
        </main>
    )
}

export default page