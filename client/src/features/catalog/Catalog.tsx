import { useEffect } from "react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { ProductList } from "./ProductList";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status } = useAppSelector((state) => {
    return state.catalog;
  });

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  if (status === "pendingFetchProducts") {
    return <LoadingComponent message="Loading products..." />;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
