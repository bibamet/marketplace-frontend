import { UserQuery } from "@/CustomTypes/UserQueryType";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setContext(loggedIn: boolean, curUser: UserQuery | null, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>, setCurrentUser: React.Dispatch<React.SetStateAction<UserQuery>>) {

  if (typeof window !== 'undefined') {
    if (!loggedIn && localStorage.getItem("currentUser") !== null) {
        let usrJson: string = localStorage.getItem("currentUser") as string;
        curUser = JSON.parse(usrJson);
        setLoggedIn(true);
        setCurrentUser(curUser as UserQuery);
    }
}

}