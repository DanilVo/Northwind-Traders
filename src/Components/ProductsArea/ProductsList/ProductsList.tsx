import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductsModel from '../../../Models/ProductsModel';
import productsServices from '../../../Service/ProductsServices';
import './ProductsList.css';

function ProductsList(): JSX.Element {
  const [beProducts, setBeProducts] = useState<ProductsModel[]>();
  let [isDeleted, setDeleted] = useState<boolean>(false);
  useEffect(() => {
    const id = toast.loading('Please wait...'); //add themes and move to service
    productsServices
      .getAllProducts()
      .then((data) => {
        setBeProducts(data);
        toast.dismiss(id);
      })
      .catch((err) =>
        toast.update(id, {
          type: 'error',
          render: err.message,
          position: 'top-center',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      );
  }, [isDeleted]);

  async function deleteProduct(id: number) {
    try {
      if (!confirm('Are you sure you want to delete this item')) return;
      await productsServices.deleteProduct(id);
      setDeleted(!isDeleted);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, m: 10 }}>
      <Grid container spacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}>
        {beProducts?.map((feProducts) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={feProducts.id}>
            <Card sx={{ Width: 345, height: 310 }}>
              <CardMedia
                component="img"
                image={feProducts.imageUrl}
                alt={feProducts.name}
                sx={{
                  height: 150,
                  width: 200,
                  m: 'auto',
                }}
              ></CardMedia>
              <CardContent sx={{ paddingBottom: 0 }}>
                <Typography
                  variant="overline"
                  fontWeight="bold"
                  lineHeight="normal"
                >
                  {feProducts.name}
                </Typography>
                <Divider />
                <Typography variant="subtitle1">
                  Price: {feProducts.price}
                </Typography>
                <Typography variant="subtitle1">
                  Stock: {feProducts.stock}
                </Typography>
              </CardContent>
              <CardActions>
                <ButtonGroup sx={{ m: 'auto' }}>
                  <NavLink to={`edit/${feProducts.id}`}>
                    <Button variant="outlined">Edit</Button>
                  </NavLink>
                  <Button
                    variant="outlined"
                    onClick={() => deleteProduct(feProducts.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <NavLink to={'/products/addProduct'}>
        <Tooltip
          title="Add new product"
          placement="bottom"
          sx={{ position: 'fixed', bottom: 55, right: 15 }}
        >
          <Button>
            <AddCircleIcon fontSize="large" />
          </Button>
        </Tooltip>
      </NavLink>
    </Box>
  );
}

export default ProductsList;
