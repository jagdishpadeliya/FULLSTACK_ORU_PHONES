'use client'
import React from 'react'
import { Button } from './ui/button'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
const LeftSidebar = () => {
    const path = usePathname()
    console.log(path);

    return (
        <div className='hidden z-30 bg-white absolute top-0 left-0 md:relative md:flex border-2 w-64 min-h-screen rounded-r-lg'
        >
            <div className='py-4 flex flex-col items-center '>
                <Link href={"/"}>
                    <Button className='font-semibold w-36' variant={"outline"}>Dashboard</Button>
                </Link>
                <div className="mt-10"></div>
                {
                    sidebarLinks.map((sidebar, index) => {
                        return (
                            <div className='flex items-center mt-2' key={index}>
                                <ChevronRight className='mr-2' size={15} />
                                <Link href={sidebar.route}>
                                    <Button variant={`${path === sidebar.route ? "outline" : "link"}`} className='w-36 justify-start'>{sidebar.name}</Button>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LeftSidebar