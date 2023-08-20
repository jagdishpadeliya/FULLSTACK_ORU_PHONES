import { MenuSquareIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { IoNotificationsOutline, IoChevronDownOutline } from 'react-icons/io5'
const Header = () => {
    const { data: session } = useSession()
    return (
        <div
            className='sticky top-0 z-20 border-b-2 w-full h-20 px-5 flex items-center justify-between bg-white animate-in animate-out'
        >
            <div className='flex items-center'>
                <MenuSquareIcon className='md:hidden mr-5'/>
                <div className='w-20 h-10 relative'>
                    <Image
                        src={"/logo.svg"}
                        fill
                        alt='logo'
                    />
                </div>
            </div>
            <div className='flex items-center'>
                <IoNotificationsOutline className="text-xl mr-3" />
                <div className='rounded-none md:rounded-md shadow-none md:shadow-md flex items-center px-2 py-1'>
                    <div className='w-8 h-8 relative rounded-md'>
                        <Image
                            src={session?.user?.image || "/user.svg"}
                            fill
                            alt='user-img'

                        />
                    </div>
                    <div className='hidden md:flex flex-col ml-2'>
                        <span className='text-xs'>Welcome back,</span>
                        <span className='text-sm'>{session?.user?.name}</span>
                    </div>
                    <IoChevronDownOutline className="ml-5 hidden md:inline-block" />
                </div>
            </div>
        </div>
    )
}

export default Header