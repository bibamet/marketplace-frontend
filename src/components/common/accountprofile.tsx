'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { cn } from "@/lib/utils"
import { ShieldCloseIcon } from "lucide-react"
import { Button } from "../ui/button"
import { DatePickerDemo } from "../ui/datepicker"
import { Input } from "../ui/input"
import { CardFooter } from "../ui/card"
import useAuthContext from "@/hooks/useAuthContext"
import UserService from "@/service/UserService"
import { UserQuery } from "@/CustomTypes/UserQueryType"
import { toast } from "sonner"
import ErrorType from "@/CustomTypes/ErrorType"
import { AxiosError } from "axios"

const AccountProfile = () => {

    const { currentUser, setCurrentUser } = useAuthContext();

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
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            birthDate: new Date(currentUser.birthDate),
            email: currentUser.email
        },
        mode: "onChange"
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        let userInfo: UserQuery | undefined = await UserService.updateUserInfo(values, currentUser.id)
            .then((data: UserQuery) => {
                toast("Данные сохранены!")
                return data
            })
            .catch((error: AxiosError<ErrorType>) => {
                toast("Произошла ошибка при сохранении", {
                    description: error?.response?.data?.message,
                })
                return undefined
            })

        if (userInfo) {
            setCurrentUser(userInfo)
            localStorage.setItem("currentUser", JSON.stringify(userInfo));
        }
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
                                        <ShieldCloseIcon onClick={() => form.setValue("birthDate", undefined as unknown as Date)} className="self-center ml-[0.5rem]"></ShieldCloseIcon>
                                    </div>
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

export default AccountProfile