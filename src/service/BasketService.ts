import { AddGoodsInBasket } from "@/CustomTypes/AddGoodsInBasket";
import routes from "@/lib/routes";
import axios, { AxiosResponse } from "axios";

class BasketService {

    static async addGoodsInBasket(command: AddGoodsInBasket): Promise<boolean> {
        return axios
        .post(`${routes.basket}`, command)
        .then((response: AxiosResponse<void>) =>
            true
        )
    }

}

export default BasketService

