import { Box, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ProductsModel from '../../../Models/ProductsModel';
import productsServices from '../../../Service/ProductsServices';
import appConfig from '../../../Utils/AppConfig';
import './EditProduct.css';

function EditProduct(): JSX.Element {
  const { prodId } = useParams();
  const nav = useNavigate();

  const { register, handleSubmit, setValue } = useForm<ProductsModel>();

  useEffect(() => {
    productsServices
      .getOneProduct(prodId)
      .then((product) => {
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('stock', product.stock);
      })
      .catch((err) => alert(err.message));
  }, []);

  async function update(product: ProductsModel) {
    try {
      product.id = +prodId;
      await productsServices.updateProduct(product);
      alert('success');
      nav('/products');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(update)}>
      <Box
        sx={{
          m: 'auto',
          width: 350,
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1">Name</Typography>
        <TextField variant="outlined" type="text" {...register('name')} />

        <Typography variant="subtitle1">Price</Typography>
        <TextField variant="outlined" type="number" {...register('price')} />

        <Typography variant="subtitle1">Stock</Typography>
        <TextField variant="outlined" type="number" {...register('stock')} />

        <button>Update</button>
      </Box>
    </form>
  );
}

export default EditProduct;
