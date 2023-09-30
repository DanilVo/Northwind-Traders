import axios from 'axios';
import ProductsModel from '../Models/ProductsModel';
import appConfig from '../Utils/AppConfig';
import {
  ProductsAction,
  ProductsActionTypes,
  productsStore,
} from '../Redux/ProductsState';

class ProductsServices {
  public async getAllProducts(): Promise<ProductsModel[]> {
    let products = productsStore.getState().products;

    if (products.length === 0) {
      const response = await axios.get(appConfig.productsUrl);
      products = response.data;
      const action: ProductsAction = {
        type: ProductsActionTypes.SetProducts,
        payload: products,
      };
      productsStore.dispatch(action);
    }
    return products;
  }

  public async getOneProduct(id: string): Promise<ProductsModel> {
    const { data } = await axios.get(appConfig.productsUrl + id);
    return data;
  }

  public async updateProduct(product: ProductsModel): Promise<ProductsModel> {
    const options = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const response = await axios.put(
      appConfig.productsUrl + product.id,
      product,
      options
    );

    const products = response.data;
    const action: ProductsAction = {
      type: ProductsActionTypes.UpdateProduct,
      payload: products,
    };
    productsStore.dispatch(action);
    return products;
  }

  public async deleteProduct(id: number): Promise<void> {
    await axios.delete(appConfig.productsUrl + id);

    const action: ProductsAction = {
      type: ProductsActionTypes.DeleteProduct,
      payload: id,
    };
    productsStore.dispatch(action);
  }

  public async addProduct(product: ProductsModel): Promise<ProductsModel> {
    const options = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const response = await axios.post(appConfig.productsUrl, product, options);
    const data = response.data;
    const action: ProductsAction = {
      type: ProductsActionTypes.AddProduct,
      payload: product,
    };

    productsStore.dispatch(action);
    return data;
  }
}

const productsServices = new ProductsServices();
export default productsServices;
