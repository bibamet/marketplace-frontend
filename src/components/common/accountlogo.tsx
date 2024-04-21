'use client'

import { cn, setContext } from "@/lib/utils";
import { PopoverTrigger, PopoverContent, PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Calendar, User, ShoppingBasket, LogOut, BadgeRussianRuble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover } from "../ui/popover";
import { UserQuery } from "@/CustomTypes/UserQueryType";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import LogInLogOutBtn from "./LogInLogOutBtn";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Profile from "./profile";

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

const AccountLogo = () => {

    const { loggedIn, currentUser, setLoggedIn, setCurrentUser } = useAuthContext();
    let curUser: UserQuery | null = null;
    useEffect(() => setContext(loggedIn, curUser, setLoggedIn, setCurrentUser), [])

    const profileRef = useRef<HTMLButtonElement>(null)
    let icons_classes = "w-5 h-5 self-center"

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="/logo-user-acc.jpg" className="w-18 h-12 rounded-full shadow-lg mb-5 shadow-slate-500 select-none" />
                        <AvatarFallback>
                            здесь будет аватарка...
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto p-0 border-transparent cursor-pointer">
                    {/* {loggedIn && <DropdownMenuItem className="hover:border-0 hover:border-transparent"><Link href="/profile" className="flex flex-row"> <User className={icons_classes} />Профиль</Link></DropdownMenuItem>} */}
                    {/* {loggedIn && <DropdownMenuItem className="hover:border-0 hover:border-transparent"><button onClick={onClickProfile} className={btn_classes}> <User className={icons_classes} />Профиль</button></DropdownMenuItem>} */}
                    {loggedIn && <div className="flex flex-row"><User className={icons_classes} /><Profile /></div>}
                    {loggedIn && <DropdownMenuItem className="hover:border-transparent"><Link href="/basket" className="flex flex-row"><ShoppingBasket className={icons_classes} />Корзина</Link></DropdownMenuItem>}
                    {loggedIn && <DropdownMenuItem className="hover:border-transparent"><Link href="/orders" className="flex flex-row"><BadgeRussianRuble className={icons_classes} />Заказы</Link></DropdownMenuItem>}
                    <DropdownMenuItem className="hover:border-transparent"><LogInLogOutBtn /></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default AccountLogo