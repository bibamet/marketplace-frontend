'use client'

import GoodsQuery from "@/CustomTypes/GoodsQueryType";
import GoodsCard from "@/components/common/goodsCard";
import HomePageMemo from "@/components/forms/HomePage";
import GoodsService from "@/service/GoodsService";
import { useEffect, useState } from "react"

const GoodsByCategories = ({ params }: { params: { name: string } }) => {

    const [goods, setGoods] = useState<GoodsQuery[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        GoodsService.getGoods(params.name)
            .then((data: GoodsQuery[]) => {
                setGoods(data)
                setIsLoading(false)
            })
    }, [])

    return (
        isLoading ?
            <>
                <HomePageMemo />
                <div className="text-center text-nowrap">Загрузка ...</div>
            </>
            :
            (goods.length > 0) ?
                <div>
                    <HomePageMemo />
                    <div className="grid grid-cols-4 gap-4 justify-items-stretch mr-[30px] ml-[30px] mt-[30px]">
                        {goods.map((good) => (
                            <GoodsCard key={good.id} {...good} />
                        ))}
                    </div>
                </div>
                :
                <div>
                    <HomePageMemo />
                    <div className="text-center text-nowrap">
                        <span className="text-nowrap">Пусто ...</span>
                    </div>
                </div>
    )

}

export default GoodsByCategories