import { boolean } from "zod"
import type { UserQuery } from "../CustomTypes/UserQueryType"
import { Dispatch, SetStateAction } from "react"

type AuthContextType = {
    loggedIn: boolean,
    currentUser: UserQuery,
    setLoggedIn: Dispatch<SetStateAction<boolean>>,
    setCurrentUser: Dispatch<SetStateAction<UserQuery>>
}

export default AuthContextType;