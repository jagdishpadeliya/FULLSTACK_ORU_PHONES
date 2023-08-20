'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { signIn, useSession, getProviders } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSupportedProviders } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const schema = z.object({
    name: z.string().trim().min(1, {
        message: "Name must be at least 1 character long"
    }),
    username: z.string().email({
        message: "Please enter a valid email address"
    }).trim(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    confirmPassword: z.string().min(8, {
        message: "Confirm Password must be at least 8 characters long"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})
const SignUp = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/"
    const signInForm = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof schema>) => {
        const res = await fetch("/api/register/", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) {
            return console.log((await res.json()).message);
        }
        signIn(undefined, { callbackUrl: "/sign-in" })
    }
    if (session) {
        router.push(callbackUrl)
    }
    return (
        <div>
            <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={signInForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signInForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signInForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password..." {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signInForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password..." {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <div className='mt-5'>
                <span className='font-bold text-lg'>Already have an account ?<Link href={"/sign-in"}><span className='ml-5 text-blue-700'>Login here...</span></Link> </span>
            </div>
        </div>
    )
}

export default SignUp