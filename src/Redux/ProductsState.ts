import { createStore } from 'redux';

import ProductsModel from '../Models/ProductsModel';

export class ProductsState {
  products: ProductsModel[] = [];
}

export enum ProductsActionTypes {
  SetProducts = 'SetProducts',
  AddProduct = 'AddProduct',
  UpdateProduct = 'UpdateProduct',
  DeleteProduct = 'DeleteProduct',
}

export interface ProductsAction {
  type: ProductsActionTypes;
  payload?: any;
}

function productsReducer(
  currentState = new ProductsState(),
  action: ProductsAction
): ProductsState {
  const newState = { ...currentState };
  switch (action.type) {
    case ProductsActionTypes.AddProduct:
      newState.products.push(action.payload);
      break;

    case ProductsActionTypes.DeleteProduct:
      const indexToDelete = newState.products.findIndex(
        (p) => action.payload === p.id
      );
      newState.products.splice(indexToDelete, 1);
      break;

    case ProductsActionTypes.SetProducts:
      newState.products = action.payload;
      break;

    case ProductsActionTypes.UpdateProduct:
      const indexToUpdate = newState.products.findIndex(
        (p) => p.id === action.payload.id
      );
      newState.products[indexToUpdate] = action.payload;
      break;
  }
  return newState;
}

export const productsStore = createStore(productsReducer);
