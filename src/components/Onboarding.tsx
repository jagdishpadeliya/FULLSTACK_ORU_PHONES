'use client'
import { useForm, SetFieldValue } from 'react-hook-form'
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
import { useSession } from 'next-auth/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { fetchUser, updateUser } from '@/lib/actions/user.actions'
import Image from 'next/image'

const schema = z.object({
    name: z.string().min(1, {
        message: "Please enter a valid name"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    phoneNumber: z.string().min(10, {
        message: "Please enter a valid phone number"
    }),
    about: z.string().min(1, {
        message: "Please write someting about yourself"
    }),
    image: z.string()
})

type UserDataType = {
    name: string,
    email: string
    phoneNumber: string,
    bio: string,
    image: string
}

const Onboarding = () => {
    const { data: session } = useSession();
    const [files, setFiles] = useState<File[]>([])
    useEffect(() => {
        async function getUser() {
            const user = await fetchUser(session?.user?.id as string)
            console.log("user" + user);

            setValue("name", user?.name)
            setValue("email", user?.email)
            setValue("phoneNumber", user?.phoneNumber)
            setValue("about", user?.bio)
            setValue("image", user?.image)
        }
        getUser()
    }, [session?.user?.id])
    const signInForm = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            about: "",
            image: ""
        }
    })
    const { setValue } = signInForm
    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const formData = new FormData();
            formData.append("file", files[0])
            formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!)
            const imageUploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData
                })
            const imageResponseJSON = (await imageUploadResponse.json());

            await updateUser({
                userId: session?.user?.id as string,
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
                bio: values.about,
                onboarded: true,
                image: imageResponseJSON.secure_url || session?.user?.image
            })
        } catch (error: any) {
            console.log(error);
        }
    }
    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();
        const fileReader = new FileReader();
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            setFiles(Array.from(target.files))
            const file = target.files[0];
            if (!file.type.includes('image')) return;
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result as string;
                fieldChange(imageDataUrl);
            }
            fileReader.readAsDataURL(file);
        }
    }
    return (
        <div>
            <Dialog open>
                {/* <DialogTrigger>
                    <Button>Open Dialog</Button>
                </DialogTrigger> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Onboarding</DialogTitle>
                        <DialogDescription>
                            Please fill out the form below to complete your onboarding process.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Form {...signInForm}>
                            <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={signInForm.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem className='flex items-center gap-5'>
                                            <FormLabel className='w-32'>{
                                                field.value ? (
                                                    <Image
                                                        src={field.value}
                                                        alt="profile image"
                                                        width={100}
                                                        height={100}
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={"/user.svg"}
                                                        alt="profile image"
                                                        width={100}
                                                        height={100}
                                                        className="rounded-full"
                                                    />
                                                )
                                            }</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='file'
                                                    accept='image/*'
                                                    placeholder="upload photo..."
                                                    onChange={(e) => handleImage(e, field.onChange)}

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signInForm.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="phone number..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signInForm.control}
                                    name="about"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>About</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="about..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Onboarding