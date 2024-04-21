'use client'

import { UserQuery } from "@/CustomTypes/UserQueryType";
import useAuthContext from "@/hooks/useAuthContext"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Link, LogOut, ShoppingBasket } from "lucide-react";

const LogInLogOutBtn = () => {

    let router = useRouter();

    const { loggedIn, currentUser, setLoggedIn, setCurrentUser } = useAuthContext();
    let curUser: UserQuery | null
    if (!loggedIn && localStorage.getItem("currentUser") !== null) {
        let usrJson: string = localStorage.getItem("currentUser") as string;
        curUser = JSON.parse(usrJson);
        setLoggedIn(true);
        setCurrentUser(curUser as UserQuery);
    }

    const onClickFunc = (event: MouseEvent) => {
        event?.preventDefault;
        if (loggedIn) {
            setLoggedIn(false);
            localStorage.removeItem("currentUser");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
        router.push("/authorization")
    }

    let icons_classes = "w-5 h-5 self-center"
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
        <div>
            {loggedIn ?
                <button className={btn_classes}
                    onClick={onClickFunc}><LogOut className={icons_classes} /> Выйти из аккаунта </button>
                :
                <button className={btn_classes} onClick={onClickFunc}>Войти</button>
            }
        </div>
    )
}

export default LogInLogOutBtn