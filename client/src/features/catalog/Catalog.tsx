import React, { useEffect, useState } from "react";
import { Product } from "../../app/models/products";
import { ProductList } from "./ProductList";

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/api/products");
      const data: Product[] = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
};
