import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { productSelectors, fetchProductAsync } from "./catalogSlice";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";

export const ProductDetails = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const { status: productStatus } = useAppSelector((state) => {
    return state.catalog;
  });

  //* Buscamos el item por el id del producto
  const item = basket?.items.find((item) => {
    return item.productId === id;
  });

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    if (!product && id) {
      dispatch(fetchProductAsync({ id }));
    }
  }, [id, item, dispatch, product]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) as number;
    if (value >= 0) {
      setQuantity(value);
    }
  };

  const handleUpdateCart = async () => {
    try {
      //* Si el elemento no existe o la cantidad local es mayor a la cantidad del item, entonces estamos agregando o anadiendo el item a la canasta
      if (!item || quantity > item.quantity) {
        //* Si el item existe, entonces anadimos la cantidad restante
        //* Si agregamos 3 elementos mas del mismo item suponiendo que ya tenemos 3 entonces el total seria (6), esa cantidad (6) la restamos del total de la cantidad de items actuales (3) lo que nos da 3, entonces eso anadimos para actualizar la cantidad
        //* Si el item no existe en la canasta, entonces anadimos la cantidad
        const updateQuantity = item ? quantity - item.quantity : quantity;
        dispatch(
          addBasketItemAsync({
            productId: product?.id!,
            quantity: updateQuantity,
          })
        );
      } else {
        const updateQuantity = item.quantity - quantity;
        dispatch(
          removeBasketItemAsync({
            productId: product?.id!,
            quantity: updateQuantity,
            name: "rem",
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (productStatus === "pendingFetchProduct") {
    return <LoadingComponent message="Loading product..." />;
  }

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              loading={status.includes("pending")}
              variant="contained"
              fullWidth
              sx={{ height: "100%" }}
              disabled={
                (!item && quantity === 0) || item?.quantity === quantity
              }
              onClick={handleUpdateCart}
            >
              {item ? "Update Quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
