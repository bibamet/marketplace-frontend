'use client'

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import { UserQuery } from "@/CustomTypes/UserQueryType";
import Header from "../common/header";
import components, { ComponentType } from "../common/menuitems";
import { NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import ListItem from "../ui/ListItem";
import AccountLogo from "../common/accountlogo";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import axios, { AxiosResponse } from "axios";
import CategoryQuery from "@/CustomTypes/CategoryQueryType";
import React from "react";
import CategoryService from "@/service/CategorySevice";


function HomePage() {

    let router = useRouter();
    
    const [categories, SetCategories] = useState<CategoryQuery[] | undefined>([])

    useEffect(() => {
        CategoryService.getCategories()
            .then((data: CategoryQuery[]) => {
                SetCategories(data as CategoryQuery[])
            })
    }, [])

    const headerCallbackfn = useCallback(
        (component: CategoryQuery) => (
            <ListItem
                key={component.name}
                title={component.ruName}
                href={`/goods/${component.name}`}
            >
                {component.description}
            </ListItem>
        ), []);

    const headerCallBackFnNew = useCallback(

        (component: ComponentType) => (
            <NavigationMenuItem key={component.title}>
                <Link href={component.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle().concat("flex flex-col h-auto")}>
                        <div className="text-sm font-medium leading-none">{component.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {component.description}
                        </p>
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        ), []);

    return (

        <div className="grid grid-flow-col justify-stretch border-b-2 border-border/60 shadow-lg shadow-slate-200">
            <div className="grid justify-items-center select-none"> <Header comp={categories as CategoryQuery[]} callBackFn={headerCallbackfn} /> </div>
            <div className="grid justify-items-end mt-2 mr-[10rem] select-none"><AccountLogo /></div>
        </div>
    )

}

const HomePageMemo = React.memo(HomePage)
export default HomePageMemo