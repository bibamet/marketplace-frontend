'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import AccountProfile from "./accountprofile"
import { DayPickerProvider } from "react-day-picker"
import PasswordProfile from "./passwordprofile"

const Profile = () => {

    let classes = "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[425px]"
    let btn_classes = `flex 
        flex-row 
        justify-start 
        items-center 
        whitespace-nowrap
        rounded-md 
        text-sm 
        font-medium 
        ring-offset-background 
        transition-colors 
        focus-visible:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-ring 
        focus-visible:ring-offset-2 
        disabled:pointer-events-none 
        disabled:opacity-50 
        text-primary 
        hover:underline 
        h-7`

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button className={btn_classes} >Профиль</button>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle className="text-[30px]">Редактирование профиля</DialogTitle>
                        <DialogDescription>
                            Внесите изменения. После нажмите кнопку "Сохранить".
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="account">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="account">Аккаунт</TabsTrigger>
                            <TabsTrigger value="password">Пароль</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader className="p-2">
                                    <CardTitle>Информация пользователя</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <DayPickerProvider initialProps={{}}>
                                        <AccountProfile />
                                    </DayPickerProvider>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader className="p-2">
                                    <CardTitle>Пароль</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <PasswordProfile />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Profile