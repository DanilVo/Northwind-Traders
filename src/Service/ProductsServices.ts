import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import ProductsModel from '../Models/ProductsModel';

class ProductsServices {
  public async getAllProducts(): Promise<ProductsModel[]> {
    const { data } = await axios.get(appConfig.productsUrl);
    return data;
  }
}

const productsServices = new ProductsServices();
export default productsServices;
