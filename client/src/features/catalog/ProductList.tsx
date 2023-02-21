import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../app/models/products";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}
export const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((product: Product) => {
        return (
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};
