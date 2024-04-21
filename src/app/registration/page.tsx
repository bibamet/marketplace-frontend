"use client"

import CreateUserQuery from "@/CustomTypes/CreateUserCommandType"
import ErrorType from "@/CustomTypes/ErrorType"
import { UserQuery } from "@/CustomTypes/UserQueryType"
import { Button } from "@/components/ui/button"
import { DatePickerDemo } from "@/components/ui/datepicker"
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuthContext from "@/hooks/useAuthContext"
import { cn, setContext } from "@/lib/utils"
import UserService from "@/service/UserService"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { ShieldCloseIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import jwt_decode from 'jsonwebtoken'
import { JwtResponse } from "@/CustomTypes/JwtResponse"
import { JwtPayload } from "@/CustomTypes/JwtPayload"

export default function RegistrationForm() {

    const router = useRouter();
    const { loggedIn, setLoggedIn, currentUser, setCurrentUser } = useAuthContext();

    let curUser: UserQuery | null = null;
    setContext(loggedIn, curUser, setLoggedIn, setCurrentUser);

    if (loggedIn) {
        router.push("/");
    }

    const formSchema = z.object({
        firstName: z.string().min(1, {
            message: 'Имя должно быть заполнено'
        }),
        lastName: z.string().min(1, {
            message: 'Фамилия должна быть заполнена'
        }),
        birthDate: z.date({
            required_error: 'Введите дату рождения'
        }),
        email: z.string().email({
            message: "введите корректный email"
        }),
        password: z.string().min(3, {
            message: 'Пароль должен содерждать, минимум, 3 символа'
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            // birthDate: new Date(),
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        let newUser: CreateUserQuery = {
            firstName: values.firstName,
            lastName: values.lastName,
            birthDate: values.birthDate,
            email: values.email,
            password: values.password
        }

        let tokens: void | JwtResponse = await UserService.createUser(newUser)
            .catch((error: AxiosError<ErrorType>) => {
                console.log(error)
                alert(error.response?.data?.message)
            })


        if (tokens) {

            let decodedUser: JwtPayload = jwt_decode.decode((tokens as JwtResponse).accessToken) as JwtPayload;

            let User: UserQuery = {
                id: decodedUser?.id as number,
                birthDate: new Date(decodedUser?.birthDate as number),
                email: decodedUser?.sub as string,
                firstName: decodedUser?.firstName as string,
                lastName: decodedUser?.lastName as string
            }

            if (User) {
                setLoggedIn(true);
                setCurrentUser(User);
                router.push("/")
                localStorage.setItem("accessToken", JSON.stringify(tokens.accessToken));
                localStorage.setItem("refreshToken", JSON.stringify(tokens.refreshToken));
                localStorage.setItem("tokens", JSON.stringify(tokens));
                localStorage.setItem("currentUser", JSON.stringify(User));
            }
        }
    }

    // eslint-disable-next-line react/display-name
    const DP = React.forwardRef(function (props, ref) {
        return <DatePickerDemo {...ref} ref={ref} />
    })

    return (

        <div className="flex flex-col items-center mt-[1.5rem]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-2",
                    "align-middle",
                    "justify-center",
                    "border border-solid border-gray-400",
                    "p-[1.5rem]",
                    "bg-gray-200",
                    "rounded-md")}>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите имя..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Фамилия</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Введите фамилию..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Дата рождения</FormLabel>
                                <FormControl>
                                    <div className="flex flex-row">
                                        <DatePickerDemo {...field} />
                                        {/* <DP ref={field} /> */}
                                        <ShieldCloseIcon onClick={() => form.setValue("birthDate", undefined as unknown as Date)} className="self-center ml-[0.5rem]"></ShieldCloseIcon>
                                    </div>
                                    {/* <Input type='date' placeholder="Укажите дату рождения..."  {...field} /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Введите e-mail..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Введите пароль..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-center align-middle">
                        <Button type="submit">Зарегистрироваться</Button>
                        <span className="ml-4 self-center">Уже есть аккаунт? <Link href='/authorization' className="underline underline-offset-2">Войти</Link></span>
                    </div>
                </form>
            </Form>
        </div>
    )
}