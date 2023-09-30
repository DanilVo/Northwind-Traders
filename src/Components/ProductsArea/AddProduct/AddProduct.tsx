import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProductsModel from '../../../Models/ProductsModel';
import productsServices from '../../../Service/ProductsServices';
import './AddProduct.css';

function AddProduct(): JSX.Element {
  const nav = useNavigate();
  const { register, handleSubmit } = useForm<ProductsModel>();
  const [imageFile, setImageFile] = useState<string>();

  function imgFile(e: any) {
    const files = e.target.files;
    
    setImageFile(URL.createObjectURL(files[0]));
}

async function newProduct(product: ProductsModel) {
    try {
        console.log(product);
      product.image = (product.image as unknown as FileList)[0];
      await productsServices.addProduct(product);
      console.log(product);
      nav('/products');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(newProduct)}>
      <Box
        sx={{
          m: 'auto',
          width: 350,
          height: 370,
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

        <Typography variant="subtitle1">Image</Typography>
        <TextField
          variant="outlined"
          type="file"
          {...register('image')}
          onChange={imgFile}
        />
        <br />
        <button>Update</button>
        <img src={imageFile} height="50px" />
      </Box>
    </form>
  );
}

export default AddProduct;
