import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/products";
import { ProductList } from "./ProductList";

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: Product[] = await agent.Catalog.list();
        setProducts(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingComponent message="Loading products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
};
