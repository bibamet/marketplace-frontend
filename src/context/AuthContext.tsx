'use client'

import { ReactNode, createContext, useState } from "react";
import { UserQuery } from '../CustomTypes/UserQueryType';
import AuthContextType from "@/CustomTypes/AuthContextType";

export const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    currentUser: {} as UserQuery,
    setLoggedIn: () => { },
    setCurrentUser: () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserQuery>({} as UserQuery);

    return (
        <AuthContext.Provider value={{ loggedIn, currentUser, setLoggedIn, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
}

