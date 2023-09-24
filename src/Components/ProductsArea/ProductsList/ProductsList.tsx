import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsModel from "../../../Models/ProductsModel";
import productsServices from "../../../Service/ProductsServices";
import "./ProductsList.css";

function ProductsList(): JSX.Element {
  const [beProducts, setBeProducts] = useState<ProductsModel[]>();

  useEffect(() => {
    const id = toast.loading("Please wait..."); //add themes and move to service
    productsServices
      .getAllProducts()
      .then((data) => {
        setBeProducts(data);
        toast.dismiss(id);
      })
      .catch((err) =>
        toast.update(id, {
          type: "error",
          render: err.message,
          position: "top-center",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
  }, []);
  return (
    <Box sx={{ flexGrow: 1, m: 10 }}>
      <Grid container spacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}>
        {beProducts?.map((feProducts) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={feProducts.id}>
            <Card key={feProducts.id} sx={{ Width: 345, height: 310 }}>
              <CardActionArea>

              <CardMedia
                component="img"
                image={feProducts.imageUrl}
                alt={feProducts.name}
                sx={{
                  height: 150,
                  width: 200,
                  m:'auto'
                }}
              ></CardMedia>
              </CardActionArea>
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
                <ButtonGroup>
                  <Button variant="outlined">Edit</Button>
                  <Button variant="outlined">Delete</Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductsList;
