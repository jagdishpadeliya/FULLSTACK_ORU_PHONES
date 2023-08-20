'use client'
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
    username: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
})

type ProviderType = {
    id: string;
}

const SignIn = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState<ProviderType[]>([
    ]);

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
        const res = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl
        })
        console.log(res);

        const providers = await getSupportedProviders();

        if (!res?.error) {
            router.push(callbackUrl)
        }
    }
    if (session) {
        router.push(callbackUrl)
    }
    useEffect(() => {
        async function getProviders() {
            const providers = await getSupportedProviders();
            const providersArray = Object.values(providers).filter((provider) => {
                if (provider.id !== "credentials")
                    return { id: provider.id }

            });
            console.log(providersArray);

            setProviders(providersArray);
        }
        getProviders();
    }, [])
    return (
        <div>
            <span className='block'>Sign In using</span>
            {
                providers.map((provider) => {
                    return (
                        <Button key={provider.id} className='my-2' onClick={() => signIn(provider.id)}>
                            {provider.id}
                        </Button>
                    )
                })
            }
            <span className='text-2xl my-5 block'>OR</span>
            <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <div className='mt-5'>
                <span className='font-bold text-lg'>Don&apos;t have an account ?<Link href={"/sign-up"}><span className='ml-5 text-blue-700'>Register here...</span></Link> </span>
            </div>
        </div>
    )
}

export default SignIn