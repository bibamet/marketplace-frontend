import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import GoodsQuery from "@/CustomTypes/GoodsQueryType"
import { MouseEventHandler, useRef } from "react"
import BasketService from "@/service/BasketService"
import { UserQuery } from "@/CustomTypes/UserQueryType"
import { AxiosError } from "axios"
import ErrorType from "@/CustomTypes/ErrorType"


const GoodsCard = ({ ...props }: GoodsQuery | undefined) => {

    let cardRef = useRef(null);

    async function onClick(e: MouseEventHandler<HTMLButtonElement>) {
        let currentUserJSON: string | null = localStorage.getItem("currentUser");
        if (!currentUserJSON) {
            alert('Произошла ошибка. Перезагрузите страницу и попробуйте снова')
        }

        let currentUser: UserQuery = JSON.parse(currentUserJSON as string);

        let addGoodsInBasket = {
            userId: currentUser.id,
            goodsId: props?.id,
        }

        let added: boolean = await BasketService.addGoodsInBasket(addGoodsInBasket)
            .catch((error: AxiosError<ErrorType>) => {
                alert(error.response?.data?.message)
                return false;
            })

        if (added) {
            alert('Товар добавлен в корзину')
        }

    }

    return (
        <Card className="grid grid-flow-row grid-rows-1" key={props?.id} ref={cardRef}>
            <CardHeader>
                <CardTitle>{props?.title}</CardTitle>
                <CardDescription>{props?.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-row space-x-1 items-center">
                            <Label htmlFor="price" className="self-center">Стоимость</Label>
                            <span id="price" className="self-center">{props?.price + " ₽"}</span>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={onClick}>Добавить в корзину</Button>
            </CardFooter>
        </Card>
    )
}

export default GoodsCard