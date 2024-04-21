'use client'

import useAuthContext from "@/hooks/useAuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CardFooter } from "../ui/card";
import { toast } from "sonner";
import exp from "constants";
import UserService from "@/service/UserService";
import { AxiosError } from "axios";
import ErrorType from "@/CustomTypes/ErrorType";
import { checkToken } from "@/lib/routes";

const PasswordProfile = () => {

    const { currentUser, setCurrentUser } = useAuthContext();

    const accessToken: string = localStorage.getItem("accessToken") as string;
    const refreshToken: string = localStorage.getItem("refreshToken") as string;

    checkToken(JSON.parse(accessToken), JSON.parse(refreshToken))

    const formSchema = z.object({
        oldPassword: z.string().min(3, {
            message: 'Пароль должен содерждать, минимум, 3 символа'
        }),
        newPassword: z.string().min(3, {
            message: 'Пароль должен содерждать, минимум, 3 символа'
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: ''
        },
        mode: "onChange"
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log("IM HERE 1", values)

        if (values.oldPassword === values.newPassword) {
            toast("Новый пароль должен отличаться от старого.")
            return
        }

        await UserService.updateUserPassword(values, currentUser.id)
            .then(() => toast("Пароль успешно обновлен!"))
            .catch((error: AxiosError<ErrorType>) => toast("Ошибка изменения пароля",
                {
                    description: error?.response?.data?.message
                }
            ))

    }

    return (

        <div className="flex flex-col items-center mt-[1rem]">
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
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Текущий пароль</FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите текущий пароль..." type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Новый пароль</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Введите новый пароль..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <CardFooter>
                        <div className="flex flex-row justify-center align-middle">
                            <Button type="submit">Сохранить</Button>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </div>
    )

}

export default PasswordProfile
