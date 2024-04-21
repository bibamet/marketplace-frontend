'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import UserService from "@/service/UserService"
import { UserQuery } from "@/CustomTypes/UserQueryType"
import { UserAuthorizeQuery } from "@/CustomTypes/UserAuthorizeQueryType"
import { AxiosError } from "axios"
import useAuthContext from "@/hooks/useAuthContext"
import ErrorType from "@/CustomTypes/ErrorType"
import { setContext } from "@/lib/utils"
import { JwtResponse } from "@/CustomTypes/JwtResponse"
import { JwtPayload } from "@/CustomTypes/JwtPayload"
import jwt_decode from 'jsonwebtoken'

export default function LoginForm() {

    let router = useRouter();
    const { loggedIn, setLoggedIn, setCurrentUser } = useAuthContext();

    let curUser: UserQuery | null = null;
    setContext(loggedIn, curUser, setLoggedIn, setCurrentUser);
    if (loggedIn) {
        router.push("/")
    }

    const formSchema = z.object({
        email: z.string().email({ message: 'Неправильно указан e-mail' }),
        password: z.string().min(1, {
            message: 'Пароль не должен быть пустой'
        }),
        rememberMe: z.boolean()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        let user: UserAuthorizeQuery = {
            email: values.email,
            password: values.password
        }

        let tokens: JwtResponse | void = await UserService.authorizeUser(user)
            .catch((error: AxiosError<ErrorType>) =>
                alert(error.response?.data?.message)
            );

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
            }

            if (values.rememberMe) {
                localStorage.setItem("currentUser", JSON.stringify(User));
            }

        }

    }

    return (
        <div className="flex flex-col items-center mt-[1rem]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-[1.5rem] border border-solid border-gray-200 bg-gray-200 rounded-md">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите e-mail..." {...field} />
                                </FormControl>
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
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row justify-between">
                                <FormLabel className="self-center">Запомнить меня</FormLabel>
                                <FormControl>
                                    <Input className="w-5" type='checkbox' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Войти</Button>
                    <Link href='/registration' className="ml-4 underline underline-offset-8 hover:text-blue-400">Зарегистрироваться</Link>
                </form>
            </Form>
        </div>
    )
}