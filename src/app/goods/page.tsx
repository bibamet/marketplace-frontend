'use client'

import GoodsQuery from "@/CustomTypes/GoodsQueryType"
import GoodsCard from "@/components/common/goodsCard"
import HomePageMemo from "@/components/forms/HomePage"
import GoodsService from "@/service/GoodsService"
import { TIMEOUT } from "dns"
import { useState, useEffect } from "react"

const AllGoods = () => {

    const [goods, setGoods] = useState<GoodsQuery[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        GoodsService.getAllGoods()
            .then((data: GoodsQuery[]) => {
                setGoods(data)
                setIsLoading(false)
            })
    }, [])

    return (

        isLoading ? <div>Загрузка ...</div> :

        (goods.length > 0) ?
            <div>
                <HomePageMemo />
                <div className="grid grid-cols-4 gap-4 justify-items-stretch mr-[30px] ml-[30px] mt-[30px]">
                    {goods.map((good) => (
                        <GoodsCard key={good.title} {...good} />
                    ))}
                </div>
            </div>
            :
            <div>
                <HomePageMemo />
                <div className="grid ">
                    <span>Пусто ...</span>
                </div>
            </div>
    )
}

export default AllGoods