import CategoryQuery from "@/CustomTypes/CategoryQueryType";
import routes from "@/lib/routes";
import axios, { AxiosResponse } from "axios";

class CategoryService {
    public static getCategories = async (): Promise<CategoryQuery[]> => {
        return await axios
        .get(`${routes.categories}`)
        .then((response: AxiosResponse<CategoryQuery[]>) =>
            response.data
        )
    };
  
  }
  
  export default CategoryService;