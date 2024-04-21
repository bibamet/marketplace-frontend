import routes from "@/lib/routes";
import GoodsQuery from "../CustomTypes/GoodsQueryType"; 
import axios, { AxiosResponse } from "axios";

class GoodsService {
    public static getGoods = async (category: string): Promise<GoodsQuery[]> => {
        return await axios
        .get(`${routes.goods}/${category}`)
        .then((response: AxiosResponse<GoodsQuery[]>) =>
            response.data
        )
    };
    
    public static getAllGoods = async (): Promise<GoodsQuery[]> => {
        return await axios
        .get(`${routes.goods}`)
        .then((response: AxiosResponse<GoodsQuery[]>) =>
            response.data
        )
    };
  
  }
  
  export default GoodsService;