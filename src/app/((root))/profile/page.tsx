'use server'
import CustomButton from '@/components/CustomButton'
import CustomPersonalDetail from '@/components/CustomPersonalDetail'
import Onboarding from '@/components/Onboarding'
import { fetchUser } from '@/lib/actions/user.actions'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)
    const user = await fetchUser(session?.user?.id)
    const isOnboarded = user?.onboarded
    const { name, email, phoneNumber, bio, image } = user || session?.user
    return (
        <section className='py-2 mb-40 h-screen overflow-y-auto border'>
            <div className='relative w-11/12 h-40 flex justify-center rounded-lg bg-blue-900 py-2 px-2'>
                {
                    !isOnboarded && <Onboarding />

                }
                <div className='w-full'>
                    <h1 className='text-white text-sm'>MY PROFILE</h1>
                </div>
                <div className="absolute flex flex-col xl:flex-row gap-10 shadow-md w-11/12 top-24 rounded-lg py-5 px-5 bg-white">
                    <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                            <div className='w-20 h-20 relative rounded-full overflow-hidden border'>
                                <Image
                                    src={image || "/user.svg"}
                                    alt='user-img'
                                    fill
                                />
                            </div>
                            <CustomButton title='Upload Photo' />
                        </div>
                        <div className='shadow-md p-4 mt-5 flex flex-col gap-5'>
                            <CustomPersonalDetail title='Your Name' value={name} />
                            <CustomPersonalDetail title='Email' value={email} />
                            <CustomPersonalDetail title='Phone Number' value={`+91${phoneNumber}`} />
                        </div>
                        <div className="shadow-md p-4 mt-5">
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-slate-700'>About {name.split(" ")[0]}</span>
                                <CustomButton title='Edit' />
                            </div>
                            <p className='mt-3 text-justify text-slate-600 font-medium'>
                                {bio}
                            </p>
                        </div>
                        <div className="shadow-md p-4 mt-5">
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-slate-700'>Skills</span>
                                <CustomButton title='Edit' />
                            </div>
                            <div className='flex flex-row flex-wrap mt-3 gap-x-3 gap-y-2'>
                                <span className='font-semibold text-slate-600 shadow-md p-2'>HTML</span>
                                <span className='font-semibold text-slate-600 shadow-md p-2'>CSS</span>
                                <span className='font-semibold text-slate-600 shadow-md p-2'>Javascript</span>
                                <span className='font-semibold text-slate-600 shadow-md p-2'>React.JS</span>
                                <span className='font-semibold text-slate-600 shadow-md p-2'>Next.JS</span>
                                <span className='font-semibold text-slate-600 shadow-md p-2'>Typescript</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 flex-col'>
                        <div className="shadow-md p-4 flex items-center justify-between">
                            <div>
                                <span className='font-bold text-slate-700'>Professional Details</span>
                                <p className='text-slate-600 mt-2'>
                                    This are the professional details shown to users in the app.
                                </p>
                            </div>
                            <Image
                                src={"/star.svg"}
                                alt='stars'
                                width={70}
                                height={70}
                            />
                        </div>
                        <div className='mt-5 flex flex-col'>
                            <div className='flex justify-between'>
                                <span className='font-bold text-slate-700'>Certifications</span>
                                <CustomButton title="Edit" />
                            </div>
                            <div className="mt-3 border px-5 py-2 rounded-full flex flex-1 items-center">
                                <div className='flex-1'>
                                    <Image
                                        src={"/hollow-star.svg"}
                                        alt='stars'
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className='flex-1 flex flex-col text-center'>
                                    <span>Python</span>
                                    <span>Coding Ninjas</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <span className='font-bold text-slate-700'>Experience</span>
                                <CustomButton title="Edit" />
                            </div>
                            <div className='shadow-md flex flex-1 gap-5 items-center mt-5 rounded-md p-3 justify-between'>
                                <div className='flex-1'>
                                    <div className='flex justify-between'>
                                        <span className='font-bold'>7 Years (2014-2021)</span>
                                        <span className='font-bold'>Full-Time</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='font-medium text-gray-500'>Oruphones</span>
                                        <span className='font-medium text-gray-500'>--Full Stack Developer</span>
                                    </div>
                                </div>
                                <div className=''>
                                    <Image
                                        src={"/hollow-star.svg"}
                                        alt='stars'
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </div>
                            <div className='shadow-md flex flex-1 gap-5 items-center mt-5 border rounded-md p-3 justify-between'>
                                <div className='flex-1'>
                                    <div className='flex justify-between'>
                                        <span className='font-bold'>6 Months (2014)</span>
                                        <span className='font-bold'>Intern</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='font-medium text-gray-500'>Oruphones</span>
                                        <span className='font-medium text-gray-500'>--Full Stack Developer</span>
                                    </div>
                                </div>
                                <div className=''>
                                    <Image
                                        src={"/hollow-star.svg"}
                                        alt='stars'
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className='flex justify-between'>
                                <span className='font-bold text-slate-700'>Education</span>
                                <CustomButton title="Edit" />
                            </div>
                            <div className="mt-3 shadow-md rounded-md p-3">
                                <span className='font-semibold text-violet-950'>IIT HYDERABAD</span>
                                <div className='mt-2 flex justify-between items-center'>
                                    <span className='font-semibold'>(2010-2014)</span>
                                    <span className='font-semibold'>B.TECH</span>
                                </div>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque est accusamus alias culpa beatae, incidunt qui eius voluptas quis minus consectetur libero illo animi voluptatibus porro recusandae, tempore quo. Eveniet?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page